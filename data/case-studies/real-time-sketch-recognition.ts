import type { CaseStudy } from "@/data/case-studies/types";

// Edit this object to update the Real-Time Sketch Recognition case study.
// Media lives in public/images/case-studies/real-time-sketch-recognition/.
export const realTimeSketchRecognitionCaseStudy: CaseStudy = {
  slug: "real-time-sketch-recognition",
  title: "Real-Time Sketch Recognition with a Custom Residual CNN",
  eyebrow: "Deep Learning · Computer Vision · Full-Stack AI",
  summary:
    "A personal full-stack AI project that recognizes 25 hand-drawn object classes from a browser canvas or camera feed, combines a custom residual CNN with a normalized stroke pipeline, and collects corrected predictions for future model improvement.",
  heroImage: "/images/projects/real-time-sketch-recognition.avif",
  heroAlt: "Preview of the real-time hand-drawn sketch recognition application",
  repositoryUrl:
    "https://github.com/luannt1010/real-time-sketch-recognition.git",
  accent: "#20876a",
  disclaimer:
    "This recognition system is a personal engineering prototype. Predictions depend on drawing style, framing, stroke quality, and the 25 supported classes; low-confidence outputs should be treated as suggestions rather than definitive labels.",
  facts: [
    { label: "Role", value: "AI Developer" },
    { label: "Project type", value: "Personal project" },
    { label: "Dataset", value: "12,500 balanced images" },
    { label: "Architecture", value: "Custom residual CNN" },
  ],
  metrics: [
    {
      value: "90.16%",
      label: "Test accuracy",
      detail: "Evaluation using the last checkpoint",
    },
    {
      value: "89.86%",
      label: "Test F1-score",
      detail: "Precision 90.02% · recall 89.93%",
    },
    {
      value: "90.92%",
      label: "Best validation F1",
      detail: "0.9091797565 at epoch 29",
    },
    {
      value: "4.63M",
      label: "Trainable parameters",
      detail: "4,630,809 parameters",
    },
  ],
  technologies: [
    "Python",
    "PyTorch",
    "OpenCV",
    "NumPy",
    "Pillow",
    "MediaPipe",
    "Django REST Framework",
    "React",
    "JavaScript",
    "Framer Motion",
    "SQLite",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "01 · Context",
      title: "Turning an image classifier into an interactive drawing experience",
      paragraphs: [
        "This personal project explores real-time classification of simple hand-drawn objects. Users can draw directly on a browser canvas or present a sketch to a camera, then receive a predicted class, confidence score, and measured inference time.",
        "The project was designed as an end-to-end product rather than a model-only experiment. It connects a custom PyTorch CNN, an OpenCV preprocessing pipeline, a Django REST API, a React interface, camera-based hand tracking, and a feedback workflow for corrected predictions.",
      ],
      bullets: [
        "Recognize 25 object classes from canvas drawings and camera input.",
        "Return prediction confidence and inference time through a REST API.",
        "Collect user corrections for future dataset and model iterations.",
      ],
    },
    {
      id: "experience",
      eyebrow: "02 · Product",
      title: "Two recognition workflows built around the same inference service",
      paragraphs: [
        "The canvas workflow lets users sketch with direct pointer input and submit the rendered drawing for recognition. The camera workflow uses MediaPipe hand tracking to capture a physical drawing and prepare it for the same backend model.",
        "React and Framer Motion provide the interactive interface, while Django REST Framework receives the image, applies the inference pipeline, and returns the predicted class, confidence, and latency. Keeping both workflows behind one service makes the model behavior consistent across input methods.",
      ],
      bullets: [
        "Canvas-based drawing with immediate model feedback.",
        "Camera recognition supported by MediaPipe hand tracking.",
        "Shared Django REST inference endpoint for both input modes.",
        "Responsive UI with confidence and inference-time display.",
      ],
      figures: [
        {
          src: "/images/case-studies/real-time-sketch-recognition/canvas_draw_demo.gif",
          alt: "Animated demonstration of sketch recognition from the browser canvas",
          caption:
            "Canvas workflow: draw an object, submit it, and inspect the predicted class and confidence.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/real-time-sketch-recognition/camera_draw_demo.gif",
          alt: "Animated demonstration of camera-based sketch recognition with hand tracking",
          caption:
            "Camera workflow: MediaPipe-assisted capture feeds a physical drawing into the same recognition service.",
          fit: "contain",
        },
      ],
    },
    {
      id: "dataset",
      eyebrow: "03 · Dataset",
      title: "A balanced 12,500-image dataset across 25 classes",
      paragraphs: [
        "The final dataset contains 12,500 images with 500 samples per class. Each class combines 300 images from Google Quick, Draw! with 200 additional custom-drawn images, resulting in 7,500 QuickDraw samples and 5,000 manually created samples.",
        "The custom drawings were added to increase visual diversity and reduce overfitting to the characteristic style of QuickDraw. The balanced dataset was split into 10,000 training images, 1,250 validation images, and 1,250 held-out test images.",
      ],
      bullets: [
        "25 classes · 500 images per class",
        "QuickDraw: 7,500 images · 300 per class",
        "Custom drawings: 5,000 images · 200 per class",
        "Train / validation / test: 10,000 / 1,250 / 1,250",
      ],
    },
    {
      id: "preprocessing",
      eyebrow: "04 · Preprocessing",
      title: "Normalizing stroke thickness, framing, and scale before inference",
      paragraphs: [
        "Each input is converted from BGR to grayscale and inverted so the sketch becomes the foreground. A distance transform estimates average stroke thickness; when the mean thickness is below two pixels, a 7 × 7 dilation kernel strengthens thin lines before the drawing is localized.",
        "Pixels above the foreground threshold define a tight bounding box. The cropped drawing is padded into a square, surrounded by a 15% margin, resized to 64 × 64 pixels with area interpolation, and converted back to three-channel RGB for the CNN. Empty inputs are rejected before inference.",
      ],
      bullets: [
        "Grayscale conversion and foreground inversion",
        "Distance-transform stroke analysis and conditional dilation",
        "Foreground crop, square padding, and 15% outer margin",
        "64 × 64 RGB model input",
      ],
      figures: [
        {
          src: "/images/case-studies/real-time-sketch-recognition/before_after_preprocess.png",
          alt: "Before-and-after comparison of a sketch processed for CNN inference",
          caption:
            "Before and after preprocessing: the raw drawing is isolated, centered, padded, resized, and normalized into the consistent 64 × 64 model input.",
          fit: "contain",
        },
      ],
    },
    {
      id: "architecture",
      eyebrow: "05 · Architecture",
      title: "A 4.63-million-parameter CNN with residual connections",
      paragraphs: [
        "The custom CNN processes a 3 × 64 × 64 input through three convolutional feature-extraction blocks. Spatial resolution decreases from 64 to 32, 16, and 8 pixels while the feature depth increases from 32 to 64 and 128 channels.",
        "Residual skip connections help preserve information and stabilize optimization. The final 8,192-value feature representation passes through fully connected layers of 512 and 256 units before the 25-class output layer.",
      ],
      bullets: [
        "Input: 3 × 64 × 64",
        "Feature stages: 32 × 32 × 32 → 64 × 16 × 16 → 128 × 8 × 8",
        "Classifier: 8,192 → 512 → 256 → 25 classes",
        "Total trainable parameters: 4,630,809",
      ],
      figures: [
        {
          src: "/images/case-studies/real-time-sketch-recognition/architecture.png",
          alt: "Architecture diagram of the custom residual CNN used for sketch recognition",
          caption:
            "Custom residual CNN architecture from the 64 × 64 RGB input through convolutional blocks and the 25-class head.",
          fit: "contain",
        },
      ],
    },
    {
      id: "training",
      eyebrow: "06 · Training & evaluation",
      title: "A two-hour, 30-epoch training run with held-out testing",
      paragraphs: [
        "The network was trained for 30 epochs with a batch size of 32, CrossEntropyLoss, Adam at a learning rate of 0.001, and dropout of 0.3. ReduceLROnPlateau monitored the maximized validation metric and adjusted the learning rate when progress stalled.",
        "Training took approximately two hours on an RTX 4050 GPU with 6 GB VRAM, a Ryzen 7 7735HS processor, and 16 GB of RAM. Validation F1 peaked at 90.92% at epoch 29, with 90.72% validation accuracy. The last checkpoint was then evaluated on the test set, reaching 90.16% accuracy, 90.02% precision, 89.93% recall, and an 89.86% F1-score.",
      ],
      bullets: [
        "Loss: CrossEntropyLoss",
        "Optimizer: Adam · learning rate: 0.001",
        "Scheduler: ReduceLROnPlateau · mode: max",
        "30 epochs · batch size 32 · dropout 0.3",
        "Test checkpoint: last",
      ],
      figures: [
        {
          src: "/images/case-studies/real-time-sketch-recognition/metrics_report.png",
          alt: "Training curves and classification metrics for the sketch recognition model",
          caption:
            "Training report for the 30-epoch experiment, including learning curves and class-level evaluation results.",
          fit: "contain",
        },
      ],
    },
    {
      id: "reflection",
      eyebrow: "07 · Reflection",
      title: "Reducing domain shift while keeping feedback trustworthy",
      paragraphs: [
        "The central modeling challenge was the domain gap between clean QuickDraw samples, freehand browser strokes, and drawings observed through a camera. Adding 5,000 custom examples and applying a consistent thickness, crop, margin, and resize pipeline made the inputs more representative and reduced overfitting to one drawing style.",
        "A second challenge is maintaining feedback quality. When a prediction is incorrect, SQLite stores the drawing, predicted label, corrected label, and confidence for later analysis. These records can support future retraining, but they still need validation so accidental or malicious corrections do not become noisy labels.",
      ],
      bullets: [
        "Evaluate canvas and camera inputs separately to measure domain shift.",
        "Validate corrected labels before adding feedback to a training set.",
        "Track latency and confidence distributions for each input workflow.",
        "Use feedback to prioritize difficult classes and recurring confusion pairs.",
      ],
    },
  ],
};
