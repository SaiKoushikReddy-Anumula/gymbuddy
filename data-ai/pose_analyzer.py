import cv2
import mediapipe as mp
import numpy as np
import json
import sys
import math
import os
import warnings
from scipy.signal import find_peaks, savgol_filter
from collections import deque
import statistics

# Suppress ALL warnings and unnecessary output
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['PYTHONWARNINGS'] = 'ignore'
cv2.setLogLevel(0)

# Redirect stderr to devnull completely
import contextlib
import subprocess

# Completely suppress stderr for the entire script
class DevNull:
    def write(self, msg):
        pass
    def flush(self):
        pass

# Override stderr from the beginning
sys.stderr = DevNull()

class WorkoutAnalyzer:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=2,
            smooth_landmarks=True,
            enable_segmentation=False,
            min_detection_confidence=0.5,  # Lowered for better detection
            min_tracking_confidence=0.5    # Lowered for better tracking
        )
        self.mp_drawing = mp.solutions.drawing_utils
        
        # Enhanced exercise thresholds and parameters
        self.squat_thresholds = {
            'knee_angle_min': 70,      # More lenient
            'knee_angle_max': 170,     # More lenient
            'hip_movement_min': 0.15,  # Minimum hip movement
            'knee_movement_min': 0.2   # Minimum knee movement
        }
        
        self.pushup_thresholds = {
            'elbow_angle_min': 60,     # More lenient
            'elbow_angle_max': 170,    # More lenient
            'elbow_movement_min': 0.25, # Minimum elbow movement
            'body_alignment_tolerance': 0.12
        }
        
        self.lunge_thresholds = {
            'asymmetry_threshold': 20,  # Reduced threshold
            'knee_movement_min': 0.2,
            'hip_movement_min': 0.15
        }
        
    def calculate_angle(self, a, b, c):
        """Calculate angle between three points with improved precision"""
        try:
            a = np.array(a)
            b = np.array(b)
            c = np.array(c)
            
            ba = a - b
            bc = c - b
            
            cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
            cosine_angle = np.clip(cosine_angle, -1.0, 1.0)
            angle = np.arccos(cosine_angle)
            
            return np.degrees(angle)
        except:
            return 0.0
    
    def calculate_distance(self, point1, point2):
        """Calculate Euclidean distance between two points"""
        try:
            return np.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)
        except:
            return 0.0
    
    def smooth_data(self, data, window_length=5):
        """Apply smoothing filter to reduce noise"""
        try:
            if len(data) < window_length:
                return data
            if window_length % 2 == 0:
                window_length -= 1
            return savgol_filter(data, window_length, min(3, window_length-1))
        except:
            return data
    
    def detect_exercise_type(self, landmarks_sequence):
        """Enhanced exercise detection with improved criteria"""
        try:
            if not landmarks_sequence or len(landmarks_sequence) < 10:
                return "unknown"
                
            # Calculate comprehensive movement metrics
            hip_movement = self.analyze_hip_movement(landmarks_sequence)
            knee_movement = self.analyze_knee_movement(landmarks_sequence)
            shoulder_movement = self.analyze_shoulder_movement(landmarks_sequence)
            elbow_movement = self.analyze_elbow_movement(landmarks_sequence)
            body_orientation = self.analyze_body_orientation(landmarks_sequence)
            leg_asymmetry = self.calculate_leg_asymmetry(landmarks_sequence)
            
            # Calculate confidence scores with improved thresholds
            squat_confidence = 0
            pushup_confidence = 0
            lunge_confidence = 0
            
            # Enhanced Squat detection
            if hip_movement >= self.squat_thresholds['hip_movement_min']:
                squat_confidence += 25
            if knee_movement >= self.squat_thresholds['knee_movement_min']:
                squat_confidence += 25
            if hip_movement > 0.25:
                squat_confidence += 20
            if knee_movement > 0.35:
                squat_confidence += 15
            if body_orientation['upright_ratio'] > 0.7:  # More upright posture
                squat_confidence += 15
                
            # Enhanced Push-up detection
            if elbow_movement >= self.pushup_thresholds['elbow_movement_min']:
                pushup_confidence += 30
            if body_orientation['horizontal_ratio'] > 0.4:  # More horizontal
                pushup_confidence += 25
            if shoulder_movement > 0.1:
                pushup_confidence += 20
            if elbow_movement > 0.4:
                pushup_confidence += 15
            if self.check_push_up_pattern(landmarks_sequence):
                pushup_confidence += 10
                
            # Enhanced Lunge detection
            if leg_asymmetry > self.lunge_thresholds['asymmetry_threshold']:
                lunge_confidence += 35
            if hip_movement >= self.lunge_thresholds['hip_movement_min']:
                lunge_confidence += 20
            if knee_movement >= self.lunge_thresholds['knee_movement_min']:
                lunge_confidence += 20
            if self.detect_forward_backward_movement(landmarks_sequence):
                lunge_confidence += 25
                
            # Determine exercise with lower threshold
            max_confidence = max(squat_confidence, pushup_confidence, lunge_confidence)
            
            if max_confidence < 35:  # Lowered threshold
                return "squat"  # Default to squat if unsure
            elif squat_confidence == max_confidence:
                return "squat"
            elif pushup_confidence == max_confidence:
                return "push_up"
            else:
                return "lunge"
        except:
            return "squat"  # Default fallback
    
    def analyze_body_orientation(self, landmarks_sequence):
        """Analyze body orientation to help classify exercises"""
        try:
            upright_frames = 0
            horizontal_frames = 0
            total_frames = len(landmarks_sequence)
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    shoulder_y = (landmarks[11].y + landmarks[12].y) / 2
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    ankle_y = (landmarks[27].y + landmarks[28].y) / 2
                    
                    # Check if upright (shoulder above hip, significant difference)
                    if shoulder_y < hip_y - 0.1:
                        upright_frames += 1
                    
                    # Check if horizontal (shoulder, hip, ankle roughly aligned)
                    if abs(shoulder_y - hip_y) < 0.2 and abs(hip_y - ankle_y) < 0.3:
                        horizontal_frames += 1
            
            return {
                'upright_ratio': upright_frames / total_frames if total_frames > 0 else 0,
                'horizontal_ratio': horizontal_frames / total_frames if total_frames > 0 else 0
            }
        except:
            return {'upright_ratio': 0, 'horizontal_ratio': 0}
    
    def calculate_leg_asymmetry(self, landmarks_sequence):
        """Calculate asymmetry between left and right leg movements"""
        try:
            left_knee_angles = []
            right_knee_angles = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_knee = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    left_knee_angles.append(left_knee)
                    right_knee_angles.append(right_knee)
            
            if len(left_knee_angles) < 2:
                return 0
                
            left_range = max(left_knee_angles) - min(left_knee_angles)
            right_range = max(right_knee_angles) - min(right_knee_angles)
            
            return abs(left_range - right_range)
        except:
            return 0
    
    def check_push_up_pattern(self, landmarks_sequence):
        """Check for push-up specific movement pattern"""
        try:
            wrist_movement = self.analyze_wrist_movement(landmarks_sequence)
            return wrist_movement > 0.1  # Minimal wrist movement for push-ups
        except:
            return False
    
    def analyze_wrist_movement(self, landmarks_sequence):
        """Analyze wrist movement for push-up detection"""
        try:
            wrist_positions = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    wrist_y = (landmarks[15].y + landmarks[16].y) / 2
                    wrist_positions.append(wrist_y)
            
            if len(wrist_positions) < 2:
                return 0
                
            wrist_positions = self.smooth_data(wrist_positions)
            return max(wrist_positions) - min(wrist_positions)
        except:
            return 0
    
    def detect_forward_backward_movement(self, landmarks_sequence):
        """Detect forward/backward movement typical in lunges"""
        try:
            ankle_x_positions = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    ankle_x = (landmarks[27].x + landmarks[28].x) / 2
                    ankle_x_positions.append(ankle_x)
            
            if len(ankle_x_positions) < 10:
                return False
                
            ankle_x_positions = self.smooth_data(ankle_x_positions)
            x_range = max(ankle_x_positions) - min(ankle_x_positions)
            
            return x_range > 0.1  # Significant horizontal movement
        except:
            return False
        """Analyze elbow angle changes for push-up detection"""
        try:
            elbow_angles = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_elbow_angle = self.calculate_angle(
                        [landmarks[11].x, landmarks[11].y],
                        [landmarks[13].x, landmarks[13].y],
                        [landmarks[15].x, landmarks[15].y]
                    )
                    elbow_angles.append(left_elbow_angle)
            
            if len(elbow_angles) < 2:
                return 0
                
            elbow_angles = self.smooth_data(elbow_angles)
            return (max(elbow_angles) - min(elbow_angles)) / 180.0
        except:
            return 0
    
    def check_horizontal_body_position(self, landmarks_sequence):
        """Check if body is in horizontal position"""
        try:
            horizontal_frames = 0
            total_frames = len(landmarks_sequence)
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    shoulder_y = (landmarks[11].y + landmarks[12].y) / 2
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    
                    if abs(shoulder_y - hip_y) < 0.15:
                        horizontal_frames += 1
            
            return horizontal_frames / total_frames > 0.6
        except:
            return False
    
    def detect_asymmetric_leg_movement(self, landmarks_sequence):
        """Detect asymmetric leg movement for lunge detection"""
        try:
            left_knee_angles = []
            right_knee_angles = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_knee = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    left_knee_angles.append(left_knee)
                    right_knee_angles.append(right_knee)
            
            if len(left_knee_angles) < 2:
                return False
                
            left_range = max(left_knee_angles) - min(left_knee_angles)
            right_range = max(right_knee_angles) - min(right_knee_angles)
            
            return abs(left_range - right_range) > 30
        except:
            return False
    
    def analyze_hip_movement(self, landmarks_sequence):
        """Enhanced hip movement analysis"""
        try:
            hip_positions = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    hip_positions.append(hip_y)
            
            if len(hip_positions) < 2:
                return 0
                
            hip_positions = self.smooth_data(hip_positions)
            return max(hip_positions) - min(hip_positions)
        except:
            return 0
    
    def analyze_knee_movement(self, landmarks_sequence):
        """Enhanced knee movement analysis"""
        try:
            knee_angles = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_knee = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    avg_knee = (left_knee + right_knee) / 2
                    knee_angles.append(avg_knee)
            
            if len(knee_angles) < 2:
                return 0
                
            knee_angles = self.smooth_data(knee_angles)
            return (max(knee_angles) - min(knee_angles)) / 180.0
        except:
            return 0
    
    def analyze_shoulder_movement(self, landmarks_sequence):
        """Enhanced shoulder movement analysis"""
        try:
            shoulder_positions = []
            for landmarks in landmarks_sequence:
                if landmarks:
                    shoulder_y = (landmarks[11].y + landmarks[12].y) / 2
                    shoulder_positions.append(shoulder_y)
            
            if len(shoulder_positions) < 2:
                return 0
                
            shoulder_positions = self.smooth_data(shoulder_positions)
            return max(shoulder_positions) - min(shoulder_positions)
        except:
            return 0
    
    def count_repetitions(self, landmarks_sequence, exercise_type):
        """Enhanced repetition counting with peak detection"""
        try:
            if exercise_type == "squat":
                return self.count_squat_reps(landmarks_sequence)
            elif exercise_type == "push_up":
                return self.count_pushup_reps(landmarks_sequence)
            elif exercise_type == "lunge":
                return self.count_lunge_reps(landmarks_sequence)
            else:
                return 0
        except:
            return 0
    
    def count_squat_reps(self, landmarks_sequence):
        """Enhanced squat counting using improved peak detection"""
        try:
            hip_positions = []
            knee_angles = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    # Use hip position as primary indicator
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    hip_positions.append(hip_y)
                    
                    # Secondary check with knee angles
                    left_knee = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    avg_knee = (left_knee + right_knee) / 2
                    knee_angles.append(avg_knee)
            
            if len(hip_positions) < 15:  # Need minimum frames
                return 0
                
            # Smooth the data
            hip_positions = self.smooth_data(hip_positions, window_length=min(9, len(hip_positions)))
            knee_angles = self.smooth_data(knee_angles, window_length=min(9, len(knee_angles)))
            
            # Find peaks in hip movement (up position)
            hip_peaks, _ = find_peaks(hip_positions, distance=15, prominence=0.02)
            
            # Find valleys in knee angles (down position)
            knee_valleys, _ = find_peaks(-np.array(knee_angles), height=-120, distance=15)
            
            # Use the more reliable count
            rep_count = max(len(hip_peaks), len(knee_valleys))
            
            # Validate rep count based on movement range
            hip_range = max(hip_positions) - min(hip_positions) if hip_positions else 0
            knee_range = max(knee_angles) - min(knee_angles) if knee_angles else 0
            
            if hip_range < 0.05 or knee_range < 20:  # Insufficient movement
                return 0
                
            return min(rep_count, len(landmarks_sequence) // 20)  # Reasonable upper limit
        except:
            return 0
    
    def count_pushup_reps(self, landmarks_sequence):
        """Enhanced push-up counting with multiple indicators"""
        try:
            elbow_angles = []
            shoulder_positions = []
            wrist_positions = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    # Primary indicator: elbow angles
                    left_elbow = self.calculate_angle(
                        [landmarks[11].x, landmarks[11].y],
                        [landmarks[13].x, landmarks[13].y],
                        [landmarks[15].x, landmarks[15].y]
                    )
                    right_elbow = self.calculate_angle(
                        [landmarks[12].x, landmarks[12].y],
                        [landmarks[14].x, landmarks[14].y],
                        [landmarks[16].x, landmarks[16].y]
                    )
                    avg_elbow = (left_elbow + right_elbow) / 2
                    elbow_angles.append(avg_elbow)
                    
                    # Secondary indicators
                    shoulder_y = (landmarks[11].y + landmarks[12].y) / 2
                    shoulder_positions.append(shoulder_y)
                    
                    wrist_y = (landmarks[15].y + landmarks[16].y) / 2
                    wrist_positions.append(wrist_y)
            
            if len(elbow_angles) < 15:
                return 0
                
            # Smooth data
            elbow_angles = self.smooth_data(elbow_angles, window_length=min(9, len(elbow_angles)))
            shoulder_positions = self.smooth_data(shoulder_positions)
            
            # Find peaks (extended position) and valleys (lowered position)
            elbow_peaks, _ = find_peaks(elbow_angles, height=140, distance=12, prominence=15)
            elbow_valleys, _ = find_peaks(-np.array(elbow_angles), height=-100, distance=12, prominence=10)
            
            # Use shoulder movement as secondary validation
            shoulder_valleys, _ = find_peaks(-np.array(shoulder_positions), distance=12)
            
            # Choose the most reliable count
            rep_count = max(len(elbow_peaks), len(elbow_valleys), len(shoulder_valleys))
            
            # Validate based on movement range
            elbow_range = max(elbow_angles) - min(elbow_angles) if elbow_angles else 0
            if elbow_range < 30:  # Insufficient elbow movement
                return 0
                
            return min(rep_count, len(landmarks_sequence) // 15)  # Reasonable upper limit
        except:
            return 0
    
    def count_lunge_reps(self, landmarks_sequence):
        """Count lunge repetitions"""
        try:
            left_knee_angles = []
            right_knee_angles = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_knee = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    left_knee_angles.append(left_knee)
                    right_knee_angles.append(right_knee)
            
            if len(left_knee_angles) < 10:
                return 0
                
            left_range = max(left_knee_angles) - min(left_knee_angles)
            right_range = max(right_knee_angles) - min(right_knee_angles)
            
            active_leg_angles = left_knee_angles if left_range > right_range else right_knee_angles
            active_leg_angles = self.smooth_data(active_leg_angles)
            
            peaks, _ = find_peaks(active_leg_angles, height=140, distance=10)
            valleys, _ = find_peaks(-np.array(active_leg_angles), height=-100, distance=10)
            
            return min(len(peaks), len(valleys))
        except:
            return 0
    
    def analyze_form(self, landmarks_sequence, exercise_type):
        """Enhanced form analysis with detailed feedback"""
        try:
            feedback = []
            form_score = 10.0
            
            if exercise_type == "squat":
                feedback, form_score = self.analyze_squat_form(landmarks_sequence)
            elif exercise_type == "push_up":
                feedback, form_score = self.analyze_pushup_form(landmarks_sequence)
            elif exercise_type == "lunge":
                feedback, form_score = self.analyze_lunge_form(landmarks_sequence)
            else:
                feedback = ["Exercise not recognized for detailed analysis"]
                form_score = 5.0
            
            return feedback, max(0.0, min(10.0, form_score))
        except:
            return ["Error analyzing form"], 5.0
    
    def analyze_squat_form(self, landmarks_sequence):
        """Enhanced squat form analysis with detailed feedback"""
        try:
            feedback = []
            form_score = 10.0
            
            # Initialize counters
            knee_cave_frames = 0
            back_lean_frames = 0
            depth_insufficient_frames = 0
            knee_forward_frames = 0
            weight_shift_frames = 0
            
            total_frames = len(landmarks_sequence)
            
            if total_frames == 0:
                return ["No valid frames for analysis"], 5.0
            
            # Initialize movement tracking for dynamic scoring
            knee_angles_over_time = []
            hip_depths = []
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    # Knee alignment check (more detailed)
                    left_knee_x = landmarks[25].x
                    left_hip_x = landmarks[23].x
                    left_ankle_x = landmarks[27].x
                    right_knee_x = landmarks[26].x
                    right_hip_x = landmarks[24].x
                    right_ankle_x = landmarks[28].x
                    
                    # Calculate knee angles for movement analysis
                    left_knee_angle = self.calculate_angle(
                        [landmarks[23].x, landmarks[23].y],
                        [landmarks[25].x, landmarks[25].y],
                        [landmarks[27].x, landmarks[27].y]
                    )
                    right_knee_angle = self.calculate_angle(
                        [landmarks[24].x, landmarks[24].y],
                        [landmarks[26].x, landmarks[26].y],
                        [landmarks[28].x, landmarks[28].y]
                    )
                    avg_knee_angle = (left_knee_angle + right_knee_angle) / 2
                    knee_angles_over_time.append(avg_knee_angle)
                    
                    # Track hip depth
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    knee_y = (landmarks[25].y + landmarks[26].y) / 2
                    hip_depths.append(hip_y - knee_y)
                    
                    # Check for knee cave (knees moving inward)
                    if (left_knee_x < left_hip_x - 0.03 or right_knee_x > right_hip_x + 0.03):
                        knee_cave_frames += 1
                    
                    # Check for knees going too far forward
                    if (left_knee_x > left_ankle_x + 0.06 or right_knee_x < right_ankle_x - 0.06):
                        knee_forward_frames += 1
                    
                    # Enhanced back posture check
                    shoulder = [(landmarks[11].x + landmarks[12].x) / 2, (landmarks[11].y + landmarks[12].y) / 2]
                    hip = [(landmarks[23].x + landmarks[24].x) / 2, (landmarks[23].y + landmarks[24].y) / 2]
                    
                    # Calculate torso angle
                    if hip[1] != shoulder[1]:  # Avoid division by zero
                        torso_angle = abs(np.arctan2(shoulder[1] - hip[1], shoulder[0] - hip[0]) * 180 / np.pi)
                        if torso_angle < 45:  # Too much forward lean
                            back_lean_frames += 1
                    
                    # Enhanced depth check - more lenient
                    if hip_y < knee_y - 0.01:  # Less strict depth requirement
                        depth_insufficient_frames += 1
                    
                    # Weight distribution check
                    left_ankle_x = landmarks[27].x
                    right_ankle_x = landmarks[28].x
                    center_x = (left_ankle_x + right_ankle_x) / 2
                    hip_center_x = (landmarks[23].x + landmarks[24].x) / 2
                    
                    if abs(hip_center_x - center_x) > 0.05:  # Weight shift
                        weight_shift_frames += 1
            
            # Calculate movement quality scores
            knee_range = max(knee_angles_over_time) - min(knee_angles_over_time) if knee_angles_over_time else 0
            depth_variation = max(hip_depths) - min(hip_depths) if hip_depths else 0
            
            # Dynamic scoring based on movement quality
            movement_bonus = 0
            if knee_range > 60:  # Good range of motion
                movement_bonus += 0.5
            if depth_variation > 0.1:  # Good depth variation
                movement_bonus += 0.5
            
            form_score += movement_bonus
            
            # Generate comprehensive feedback based on percentages
            knee_cave_pct = knee_cave_frames / total_frames
            knee_forward_pct = knee_forward_frames / total_frames
            back_lean_pct = back_lean_frames / total_frames
            depth_insufficient_pct = depth_insufficient_frames / total_frames
            weight_shift_pct = weight_shift_frames / total_frames
            
            if knee_cave_pct > 0.2:
                feedback.append("Keep your knees aligned with your toes - avoid letting them cave inward")
                form_score -= 2.0
            elif knee_cave_pct > 0.1:
                feedback.append("Watch your knee alignment - slight inward movement detected")
                form_score -= 1.0
            
            if knee_forward_pct > 0.3:
                feedback.append("Keep your knees behind your toes - sit back more")
                form_score -= 1.5
            elif knee_forward_pct > 0.15:
                feedback.append("Try to keep your knees slightly more behind your toes")
                form_score -= 0.5
            
            if back_lean_pct > 0.3:
                feedback.append("Keep your chest up and maintain a more upright torso")
                form_score -= 2.0
            elif back_lean_pct > 0.15:
                feedback.append("Try to keep your chest up a bit more")
                form_score -= 1.0
            
            if depth_insufficient_pct > 0.4:
                feedback.append("Go deeper - aim to get your hips below knee level")
                form_score -= 1.5
            elif depth_insufficient_pct > 0.2:
                feedback.append("Try to go a bit deeper in your squat")
                form_score -= 0.5
            
            if weight_shift_pct > 0.3:
                feedback.append("Keep your weight centered and balanced")
                form_score -= 1.0
            elif weight_shift_pct > 0.15:
                feedback.append("Try to maintain better balance throughout the movement")
                form_score -= 0.5
            
            # Add positive feedback based on final score
            if form_score >= 9.5:
                feedback.append("Perfect squat form! Excellent technique!")
            elif form_score >= 8.5:
                feedback.append("Excellent squat form! Great depth and alignment!")
            elif form_score >= 7.5:
                feedback.append("Good squat form overall, minor adjustments needed")
            elif form_score >= 6.5:
                feedback.append("Decent squat form, focus on the feedback points")
            else:
                feedback.append("Work on the key form points for better technique")
            
            if not feedback:
                feedback.append("Solid squat technique! Keep practicing!")
            
            return feedback, max(0.0, min(10.0, form_score))
        except Exception as e:
            return [f"Error analyzing squat form: {str(e)}"], 5.0
    
    def analyze_pushup_form(self, landmarks_sequence):
        """Enhanced push-up form analysis"""
        try:
            feedback = []
            form_score = 10.0
            
            hip_sag_frames = 0
            hip_pike_frames = 0
            partial_rom_frames = 0
            head_position_frames = 0
            
            total_frames = len(landmarks_sequence)
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    shoulder_y = (landmarks[11].y + landmarks[12].y) / 2
                    hip_y = (landmarks[23].y + landmarks[24].y) / 2
                    ankle_y = (landmarks[27].y + landmarks[28].y) / 2
                    
                    if hip_y > max(shoulder_y, ankle_y) + 0.03:
                        hip_sag_frames += 1
                    
                    if hip_y < min(shoulder_y, ankle_y) - 0.03:
                        hip_pike_frames += 1
                    
                    elbow_angle = self.calculate_angle(
                        [landmarks[11].x, landmarks[11].y],
                        [landmarks[13].x, landmarks[13].y],
                        [landmarks[15].x, landmarks[15].y]
                    )
                    
                    if elbow_angle > 110:
                        partial_rom_frames += 1
                    
                    nose_y = landmarks[0].y
                    if nose_y > shoulder_y + 0.05:
                        head_position_frames += 1
            
            # Generate feedback
            if hip_sag_frames > total_frames * 0.2:
                feedback.append("Keep your core tight - avoid hip sag")
                form_score -= 2.5
            
            if hip_pike_frames > total_frames * 0.2:
                feedback.append("Keep your body straight - avoid piking your hips")
                form_score -= 2.0
            
            if partial_rom_frames > total_frames * 0.3:
                feedback.append("Go lower - chest should nearly touch the ground")
                form_score -= 2.0
            
            if head_position_frames > total_frames * 0.25:
                feedback.append("Keep your head in neutral position")
                form_score -= 1.0
            
            if not feedback:
                feedback.append("Perfect push-up form! Well done!")
            
            return feedback, form_score
        except:
            return ["Error analyzing push-up form"], 5.0
    
    def analyze_lunge_form(self, landmarks_sequence):
        """Analyze lunge form"""
        try:
            feedback = []
            form_score = 10.0
            
            knee_forward_frames = 0
            torso_lean_frames = 0
            insufficient_depth_frames = 0
            
            total_frames = len(landmarks_sequence)
            
            for landmarks in landmarks_sequence:
                if landmarks:
                    left_knee_x = landmarks[25].x
                    left_ankle_x = landmarks[27].x
                    
                    if left_knee_x > left_ankle_x + 0.05:
                        knee_forward_frames += 1
                    
                    shoulder_x = (landmarks[11].x + landmarks[12].x) / 2
                    hip_x = (landmarks[23].x + landmarks[24].x) / 2
                    
                    if abs(shoulder_x - hip_x) > 0.08:
                        torso_lean_frames += 1
                    
                    front_knee_y = landmarks[25].y
                    back_knee_y = landmarks[26].y
                    
                    if min(front_knee_y, back_knee_y) > 0.7:
                        insufficient_depth_frames += 1
            
            if knee_forward_frames > total_frames * 0.2:
                feedback.append("Keep your front knee behind your toes")
                form_score -= 2.0
            
            if torso_lean_frames > total_frames * 0.25:
                feedback.append("Keep your torso upright")
                form_score -= 1.5
            
            if insufficient_depth_frames > total_frames * 0.3:
                feedback.append("Go deeper in your lunge")
                form_score -= 1.5
            
            if not feedback:
                feedback.append("Great lunge form!")
            
            return feedback, form_score
        except:
            return ["Error analyzing lunge form"], 5.0
    
    def analyze_video(self, video_path):
        """Enhanced video analysis with improved error handling and processing"""
        try:
            # Suppress OpenCV output
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                return {
                    "exerciseName": "error",
                    "repCount": 0,
                    "feedback": ["Could not open video file - check file format and path"],
                    "formScore": 0.0
                }
            
            # Get video properties for better processing
            fps = cap.get(cv2.CAP_PROP_FPS)
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            duration = total_frames / fps if fps > 0 else 0
            
            landmarks_sequence = []
            frame_count = 0
            processed_frames = 0
            
            # Skip frames for performance if video is too long
            frame_skip = max(1, int(fps / 10)) if fps > 10 else 1
            
            while cap.isOpened():
                success, image = cap.read()
                if not success:
                    break
                
                frame_count += 1
                
                # Skip frames if needed
                if frame_count % frame_skip != 0:
                    continue
                    
                processed_frames += 1
                
                # Resize for better performance and accuracy
                height, width = image.shape[:2]
                if width > 640:
                    scale = 640.0 / width
                    new_width = int(width * scale)
                    new_height = int(height * scale)
                    image = cv2.resize(image, (new_width, new_height))
                
                # Improve image quality
                image = cv2.convertScaleAbs(image, alpha=1.1, beta=10)
                
                # Convert and process
                image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                results = self.pose.process(image_rgb)
                
                if results.pose_landmarks:
                    landmarks_sequence.append(results.pose_landmarks.landmark)
                else:
                    landmarks_sequence.append(None)
                
                # Limit processing for very long videos
                if processed_frames > 500:  # About 50 seconds at 10fps
                    break
            
            cap.release()
            
            # Filter valid landmarks
            valid_landmarks = [lm for lm in landmarks_sequence if lm is not None]
            detection_rate = len(valid_landmarks) / len(landmarks_sequence) if landmarks_sequence else 0
            
            if not valid_landmarks:
                return {
                    "exerciseName": "error",
                    "repCount": 0,
                    "feedback": ["Could not detect person in video - ensure good lighting and full body visibility"],
                    "formScore": 0.0
                }
            
            if len(valid_landmarks) < 10:
                return {
                    "exerciseName": "error",
                    "repCount": 0,
                    "feedback": ["Video too short or insufficient pose detection for analysis"],
                    "formScore": 0.0
                }
            
            # Analyze workout with enhanced detection
            exercise_type = self.detect_exercise_type(valid_landmarks)
            rep_count = self.count_repetitions(valid_landmarks, exercise_type)
            feedback, form_score = self.analyze_form(valid_landmarks, exercise_type)
            
            # Add analysis quality info
            quality = "high" if detection_rate > 0.8 else "medium" if detection_rate > 0.5 else "low"
            
            # Ensure minimum rep count for detected exercises
            if rep_count == 0 and exercise_type != "error":
                rep_count = max(1, int(len(valid_landmarks) / 30))  # Estimate based on duration
            
            result = {
                "exerciseName": exercise_type,
                "repCount": rep_count,
                "feedback": feedback,
                "formScore": round(form_score, 1),
                "analysisQuality": quality,
                "detectionRate": round(detection_rate * 100, 1)
            }
            
            return result
            
        except Exception as e:
            return {
                "exerciseName": "error",
                "repCount": 0,
                "feedback": [f"Analysis failed: {str(e)}"],
                "formScore": 0.0
            }

def main():
    try:
        if len(sys.argv) != 2:
            result = {"error": "Usage: python pose_analyzer.py <video_path>"}
            print(json.dumps(result))
            sys.exit(1)
        
        video_path = sys.argv[1]
        
        analyzer = WorkoutAnalyzer()
        
        result = analyzer.analyze_video(video_path)
        print(json.dumps(result))
        
        # Ensure we exit with code 0 on success
        sys.exit(0)
        
    except Exception as e:
        result = {
            "exerciseName": "error",
            "repCount": 0,
            "feedback": [f"Analysis failed: {str(e)}"],
            "formScore": 0.0
        }
        print(json.dumps(result))
        sys.exit(1)

if __name__ == "__main__":
    main()
