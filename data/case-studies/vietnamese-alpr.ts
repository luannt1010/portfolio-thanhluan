import type { CaseStudy } from "@/data/case-studies/types";

// Edit this object to update the Vietnamese ALPR case study.
// Media lives in public/images/case-studies/vietnamese-alpr/.
export const vietnameseAlprCaseStudy: CaseStudy = {
  slug: "vietnamese-alpr",
  title: "Vietnamese Automatic License Plate Recognition",
  eyebrow: "Computer Vision · Object Detection · Vision-Language OCR",
  summary:
    "A personal end-to-end ALPR system for Vietnamese vehicles that compares Faster R-CNN and YOLO11n, recognizes cropped plates with a LoRA-fine-tuned DeepSeek-OCR model, and delivers predictions through CLI and PyQt5 video workflows.",
  heroImage: "/images/projects/vietnamese-alpr.png",
  heroAlt:
    "Preview of the Vietnamese automatic license plate recognition system",
  repositoryUrl: "https://github.com/luannt1010/alpr-system.git",
  accent: "#e2552f",
  disclaimer:
    "This ALPR system is a personal engineering prototype. Recognition quality can vary with motion blur, lighting, camera angle, occlusion, plate condition, and unseen formats; it should not be used as the sole basis for enforcement or other consequential decisions.",
  facts: [
    { label: "Role", value: "AI Developer" },
    { label: "Project type", value: "Personal project" },
    { label: "Detection data", value: "4,534 images" },
    { label: "Default pipeline", value: "Faster R-CNN + DeepSeek-OCR" },
  ],
  metrics: [
    {
      value: "98.71%",
      label: "YOLO11n test mAP@50",
      detail: "Precision 97.66% · recall 96.14%",
    },
    {
      value: "85.71%",
      label: "YOLO11n test mAP@50:95",
      detail: "Held-out evaluation on 169 images",
    },
    {
      value: "96.46%",
      label: "Faster R-CNN test mAP@50",
      detail: "MobileNet V3 Large FPN · default detector",
    },
    {
      value: "76.88%",
      label: "Faster R-CNN test mAP@50:95",
      detail: "Held-out detector evaluation",
    },
  ],
  technologies: [
    "Python",
    "PyTorch",
    "Torchvision",
    "Faster R-CNN",
    "MobileNet V3 Large FPN",
    "YOLO11n",
    "Ultralytics",
    "DeepSeek-OCR",
    "Unsloth",
    "LoRA",
    "Transformers",
    "OpenCV",
    "Albumentations",
    "PyQt5",
    "Pandas",
    "CUDA",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "01 · Context",
      title: "Recognizing Vietnamese plates from image or video input",
      paragraphs: [
        "This personal project explores a complete automatic license plate recognition workflow for Vietnamese vehicles. The system handles both long, single-line plates and square, two-line plates, then converts each detected crop into a normalized text prediction.",
        "The work goes beyond a single detector experiment. It compares two object-detection approaches, fine-tunes a vision-language OCR model, connects the components through a reusable pipeline, and exposes practical command-line and desktop application workflows.",
      ],
      bullets: [
        "Detect single-line and two-line Vietnamese license plates.",
        "Compare Faster R-CNN MobileNet V3 Large FPN with YOLO11n.",
        "Recognize cropped plates with a fine-tuned DeepSeek-OCR model.",
        "Persist plate crops and structured JSON predictions.",
      ],
    },
    {
      id: "system",
      eyebrow: "02 · System",
      title: "A modular detector → crop → OCR → output pipeline",
      paragraphs: [
        "Still images enter through the command-line tools, while the PyQt5 desktop application reads a selected video and lets the user pause on a frame. The detector returns a confidence score, plate type, and bounding box; the highest-confidence detection is cropped and passed to DeepSeek-OCR.",
        "Faster R-CNN is the default detector in the CLI, end-to-end pipeline, and desktop application. YOLO11n remains available as an optional detector so both approaches can be evaluated behind the same crop and OCR interface. Successful runs return the score, label, bounding box, and recognized text, then save both the plate crop and a JSON result.",
      ],
      bullets: [
        "Dedicated detector-only, OCR-only, and end-to-end CLI commands.",
        "Default Faster R-CNN path with optional YOLO11n selection.",
        "Shared crop and DeepSeek-OCR stages across detector choices.",
        "Saved image crops and JSON results for later inspection.",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-alpr/workflow.png",
          alt: "Architecture of the Vietnamese ALPR system from image or video input to OCR and saved output",
          caption:
            "Complete ALPR architecture covering image and video input, selectable plate detection, highest-confidence crop selection, DeepSeek-OCR, desktop display, and persisted outputs.",
          fit: "contain",
        },
      ],
    },
    {
      id: "detection-data",
      eyebrow: "03 · Detection dataset",
      title: "A two-class Roboflow dataset with a held-out test split",
      paragraphs: [
        "The detector dataset was sourced through Roboflow and contains 4,534 labeled images. It separates long, single-line plates from square or two-line plates so the downstream workflow can preserve the plate layout alongside the bounding box.",
        "The data was divided into 3,132 training images, 1,233 validation images, and 169 held-out test images. Both detector families used the same 640 × 640 input size and the same two target classes, making their reported results easier to compare.",
      ],
      bullets: [
        "Training set: 3,132 images",
        "Validation set: 1,233 images",
        "Test set: 169 images",
        "Classes: single-line plate and two-line plate",
      ],
    },
    {
      id: "detectors",
      eyebrow: "04 · Detector training",
      title: "Comparing a two-stage detector with a compact YOLO baseline",
      paragraphs: [
        "The Faster R-CNN model uses a MobileNet V3 Large FPN backbone. It was trained for 50 epochs at 640 × 640 with a batch size of 16, SGD at a learning rate of 5e-4, and ReduceLROnPlateau in max mode. Training took 104.879 minutes on an RTX 4050 Laptop GPU with 6 GB VRAM, a Ryzen 7 7735HS processor, and 16 GB of RAM.",
        "YOLO11n was also trained for 50 epochs with 640 × 640 inputs, a batch size of 16, pretrained weights, mixed precision, and the Ultralytics automatic optimizer configuration. On the 169-image test set, YOLO11n reached 97.66% precision, 96.14% recall, 98.71% mAP@50, and 85.71% mAP@50:95. Faster R-CNN reached 96.46% mAP@50 and 76.88% mAP@50:95 and remains the detector selected by default in the final application.",
      ],
      bullets: [
        "Faster R-CNN: 50 epochs · batch 16 · SGD · learning rate 5e-4",
        "Faster R-CNN scheduler: ReduceLROnPlateau · mode max",
        "YOLO11n: 50 epochs · batch 16 · pretrained · AMP enabled",
        "Detection hardware: RTX 4050 6 GB · Ryzen 7 7735HS · 16 GB RAM",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-alpr/faster-rcnn-training.png",
          alt: "Faster R-CNN training loss and mAP curves across 50 epochs",
          caption:
            "Faster R-CNN training history: loss falls steadily while validation mAP stabilizes during the 50-epoch run.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/yolo11n-training.png",
          alt: "YOLO11n training, validation, precision, recall, and mAP curves",
          caption:
            "YOLO11n training report showing box, classification, and DFL losses alongside validation precision, recall, and mAP.",
          fit: "contain",
        },
      ],
    },
    {
      id: "ocr-data",
      eyebrow: "05 · OCR dataset",
      title: "Expanding 12,190 cropped plates into 60,950 OCR samples",
      paragraphs: [
        "The OCR dataset was also obtained through Roboflow and contains plate crops rather than complete vehicle scenes. Starting from 12,190 labeled plate images, the augmentation pipeline keeps the original and generates four additional variants per image.",
        "The five-way dataset includes horizontal flip, vertical flip, affine rotation between −45° and 45°, and randomized brightness and contrast. The resulting 60,950 images were divided into 54,855 training samples and 6,095 validation samples.",
      ],
      bullets: [
        "Original cropped plates: 12,190 images",
        "Augmented total: 60,950 images",
        "Train / validation: 54,855 / 6,095",
        "Five versions per source image: original plus four transformations",
      ],
      figureLayout: "gallery",
      figures: [
        {
          src: "/images/case-studies/vietnamese-alpr/ocr-original.jpg",
          alt: "Original cropped Vietnamese license plate used for OCR training",
          caption: "Original crop",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/ocr-horizontal-flip.jpg",
          alt: "Horizontally flipped OCR training sample",
          caption: "Horizontal flip",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/ocr-vertical-flip.jpg",
          alt: "Vertically flipped OCR training sample",
          caption: "Vertical flip",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/ocr-rotation.jpg",
          alt: "Rotated OCR training sample",
          caption: "Affine rotation",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/ocr-color.jpg",
          alt: "Brightness and contrast augmented OCR training sample",
          caption: "Brightness / contrast",
          fit: "contain",
        },
      ],
    },
    {
      id: "ocr-training",
      eyebrow: "06 · OCR fine-tuning",
      title: "Adapting DeepSeek-OCR with LoRA and mixed-precision training",
      paragraphs: [
        "DeepSeek-OCR was fine-tuned with Unsloth and LoRA on an RTX 5090. The Trainer used a per-device batch size of 4 with four gradient-accumulation steps, producing an effective batch size of 16. The run used AdamW 8-bit, a learning rate of 2e-4, weight decay of 0.001, a 3% warmup ratio, cosine scheduling, and seed 3407.",
        "Evaluation and checkpoint saving were performed every 100 steps. The run was stopped after 1,000 steps, where the logged training loss was 0.684900 and validation loss was 0.629451. No character accuracy, CER, or exact-plate metric was collected for this experiment, so the OCR result is reported strictly through the available loss history and qualitative application demonstrations.",
      ],
      bullets: [
        "LoRA fine-tuning with Unsloth and Hugging Face Trainer",
        "Batch size 4 · gradient accumulation 4 · effective batch size 16",
        "AdamW 8-bit · learning rate 2e-4 · cosine scheduler",
        "Mixed precision · RTX 5090 · stopped at 1,000 steps",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-alpr/deepseek-ocr-finetuning.png",
          alt: "DeepSeek-OCR training and validation loss logged every 100 steps",
          caption:
            "DeepSeek-OCR fine-tuning log through step 1,000. The experiment records loss only, so no unsupported OCR accuracy claim is made.",
          fit: "contain",
        },
      ],
    },
    {
      id: "application",
      eyebrow: "07 · Product workflow",
      title: "Pausing real-world video frames for end-to-end recognition",
      paragraphs: [
        "The PyQt5 desktop application accepts common video formats, previews the selected clip, and lets the user pause on a target frame before running detection and OCR. The result panel shows the recognized text alongside the crop selected by the detector.",
        "Models are loaded on the first request and cached for subsequent predictions. The desktop application always uses Faster R-CNN, while the CLI can switch to YOLO11n. The current product supports video and still-image workflows but does not provide live webcam capture because the project was not validated with sufficient camera hardware and deployment conditions.",
      ],
      bullets: [
        "Video formats: MP4, AVI, MOV, MKV, and WebM",
        "Pause-and-recognize interaction in the PyQt5 interface",
        "Model caching after the first inference request",
        "No webcam or live-camera mode in the current prototype",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-alpr/demo-single-line-car.png",
          alt: "Desktop ALPR application recognizing a single-line car plate",
          caption:
            "Single-line car plate recognized from a paused real-world video frame.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/demo-two-line-motorcycle.png",
          alt: "Desktop ALPR application recognizing a two-line motorcycle plate",
          caption:
            "Two-line motorcycle plate detected, cropped, and converted to text.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-alpr/demo-two-line-car.png",
          alt: "Desktop ALPR application recognizing a two-line car plate",
          caption:
            "Two-line car plate example from the same desktop video workflow.",
          fit: "contain",
        },
      ],
    },
    {
      id: "reflection",
      eyebrow: "08 · Reflection",
      title: "A complete prototype with clear next evaluation steps",
      paragraphs: [
        "The project demonstrates how interchangeable detectors can share one crop, OCR, and output pipeline. YOLO11n produced the stronger held-out detection metrics in the reported experiment, while Faster R-CNN remained the default implementation used by the desktop application and standard CLI flow.",
        "The largest remaining gap is end-to-end OCR evaluation. A future iteration should measure exact plate-string accuracy and character error rate on a separately labeled test set, add multiple-plate processing, benchmark latency for both detectors, and validate performance across blur, distance, camera angle, night scenes, and additional Vietnamese plate formats.",
      ],
      bullets: [
        "Add exact-string and character-level OCR evaluation.",
        "Benchmark full-pipeline latency for both detector choices.",
        "Support multiple plates in one image or frame.",
        "Add live-camera capture after suitable hardware validation.",
      ],
    },
  ],
};
