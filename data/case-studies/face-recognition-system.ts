import type { CaseStudy } from "@/data/case-studies/types";

// Edit this object to update the Face Recognition System case study.
// Images live in public/images/case-studies/face-recognition-system/.
export const faceRecognitionCaseStudy: CaseStudy = {
  slug: "face-recognition-system",
  title: "Real-Time Face Recognition System with MobileFaceNet",
  eyebrow: "Computer Vision · Metric Learning · Vector Search",
  summary:
    "A personal end-to-end face recognition system that combines compact 512-dimensional embeddings, real-time detection and tracking, vector search, API services, and a desktop application.",
  heroImage: "/images/projects/face-recognition-system.webp",
  heroAlt:
    "Preview of the real-time face registration and recognition application",
  repositoryUrl:
    "https://github.com/luannt1010/face-recoginition-system.git",
  accent: "#3454d1",
  disclaimer:
    "Face recognition processes sensitive biometric information. This project is a personal engineering prototype and should only be used with informed consent, appropriate data protection, and application-specific validation. It is not intended for covert surveillance or high-stakes autonomous decisions.",
  facts: [
    { label: "Role", value: "AI / ML Developer" },
    { label: "Project type", value: "Personal project" },
    { label: "Training data", value: "490,623 images" },
    { label: "Architecture", value: "MobileFaceNet + ArcFace" },
  ],
  metrics: [
    {
      value: "91.37%",
      label: "Verification accuracy",
      detail: "Best validation result at epoch 83",
    },
    {
      value: "96.28%",
      label: "ROC-AUC",
      detail: "Best validation result at epoch 41",
    },
    {
      value: "85.27%",
      label: "TAR at 1% FAR",
      detail: "Best validation result at epoch 91",
    },
    {
      value: "1.20M",
      label: "Trainable parameters",
      detail: "1,200,512 parameters with 512-D output",
    },
  ],
  technologies: [
    "Python",
    "PyTorch",
    "MobileFaceNet",
    "ArcFace",
    "OpenCV",
    "SCRFD",
    "ByteTrack",
    "ONNX Runtime",
    "FastAPI",
    "PyQt6",
    "PostgreSQL",
    "pgvector",
    "HNSW",
    "Docker",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "01 · Context",
      title: "Turning face embeddings into a complete recognition workflow",
      paragraphs: [
        "This personal project explores a reusable face recognition system for consent-based scenarios such as attendance tracking, identity verification, and access control. The goal was not only to train an embedding model, but also to connect detection, tracking, identity search, APIs, storage, and a usable desktop interface.",
        "The system supports both registration and recognition. A registered face is converted into a normalized embedding and stored in PostgreSQL, while live observations are matched against stored identities through vector similarity search.",
      ],
      bullets: [
        "Build compact 512-dimensional face embeddings for identity matching.",
        "Support registration, verification, and real-time multi-face recognition.",
        "Keep model inference, vector search, API, and desktop UI as modular components.",
      ],
    },
    {
      id: "system",
      eyebrow: "02 · System",
      title: "From camera frame to tracked identity and vector search",
      paragraphs: [
        "The runtime pipeline detects faces with SCRFD, aligns and crops them to the model input format, and generates embeddings with MobileFaceNet. ByteTrack maintains identity continuity across video frames so the system does not need to treat every detection as a completely new observation.",
        "Embeddings are searched with cosine or Euclidean distance in PostgreSQL through pgvector. An HNSW index can accelerate approximate nearest-neighbor retrieval as the number of registered identities grows. FastAPI exposes the services, ONNX Runtime handles portable inference, and PyQt6 provides the desktop workflow.",
      ],
      bullets: [
        "SCRFD face detection and alignment before embedding extraction.",
        "ByteTrack for real-time multi-face tracking across frames.",
        "PostgreSQL and pgvector for persistent similarity search.",
        "Docker-based database setup for reproducible local deployment.",
      ],
      figures: [
        {
          src: "/images/case-studies/face-recognition-system/demo_register.jpg",
          alt: "Desktop application displaying the face registration workflow",
          caption:
            "Registration workflow used to capture an aligned face and associate its embedding with an identity.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/face-recognition-system/demo_recog.jpg",
          alt: "Desktop application recognizing and tracking a face in real time",
          caption:
            "Recognition workflow showing face detection, tracking, and identity matching in the desktop application.",
          fit: "contain",
        },
      ],
    },
    {
      id: "dataset",
      eyebrow: "03 · Dataset",
      title: "Nearly half a million aligned WebFace images",
      paragraphs: [
        "The reported training run used the WebFace 112 × 112 dataset. After preparing the available images, 343,437 samples were used for training and 147,186 for validation, for a total of 490,623 images and an approximately 70/30 split.",
        "The model consumes aligned RGB face crops at 112 × 112 pixels. The same geometric alignment between training and runtime inference is important because embedding quality is sensitive to inconsistent pose, crop, and facial landmark placement.",
      ],
      bullets: [
        "Training set: 343,437 images",
        "Validation set: 147,186 images",
        "Input resolution: 112 × 112 RGB",
        "Validation metrics are reported separately from the training metrics",
      ],
    },
    {
      id: "architecture",
      eyebrow: "04 · Architecture",
      title: "A 1.2-million-parameter MobileFaceNet for 512-D embeddings",
      paragraphs: [
        "MobileFaceNet was selected as the embedding backbone because depthwise convolutions and compact bottleneck blocks provide a practical balance between representation quality and inference cost. Residual connections are used when the spatial stride and channel dimensions allow them.",
        "The backbone produces a 512-dimensional unit-normalized face embedding. During training, ArcFace adds an angular margin to the classification objective so embeddings from the same identity become more compact while different identities are pushed farther apart.",
      ],
      bullets: [
        "1,200,512 trainable parameters",
        "Depthwise convolution and compact bottleneck stages",
        "512-dimensional L2-normalized embedding output",
        "ArcFace margin-based classification objective",
      ],
      figures: [
        {
          src: "/images/case-studies/face-recognition-system/model_architec.png",
          alt: "Detailed MobileFaceNet architecture with bottleneck blocks and a 512-dimensional embedding output",
          caption:
            "MobileFaceNet architecture used for the reported run, including depthwise operations, bottleneck blocks, residual paths, and the 512-D embedding head.",
          fit: "contain",
        },
      ],
    },
    {
      id: "training",
      eyebrow: "05 · Training",
      title: "A 100-epoch ArcFace run on consumer hardware",
      paragraphs: [
        "The model was trained with SGD for 100 epochs using a batch size of 128 and an initial learning rate of 0.1. StepLR reduced the learning rate by a factor of 0.1 every 20 epochs, eventually reaching 0.00001 during the final stage of training.",
        "Training 490,623 images on an RTX 4050 Laptop GPU with 6 GB VRAM took 2,514 minutes, or approximately 41 hours 54 minutes. The Ryzen 7 7735HS system and 16 GB of RAM were sufficient for the experiment, but the long run made efficient data loading, checkpointing, and a compact backbone important practical considerations.",
      ],
      bullets: [
        "Optimizer: SGD",
        "Loss: ArcFace",
        "Epochs: 100 · Batch size: 128",
        "StepLR: step size 20 · gamma 0.1",
        "Hardware: RTX 4050 6 GB · Ryzen 7 7735HS · 16 GB RAM",
      ],
      figures: [
        {
          src: "/images/case-studies/face-recognition-system/loss_and_lr.png",
          alt: "Training and validation loss alongside the StepLR learning-rate schedule",
          caption:
            "Training history across 100 epochs. The visible loss transitions align with each 20-epoch StepLR reduction.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/face-recognition-system/classification_metrics.png",
          alt: "Validation classification accuracy, precision, recall, and F1-score across training",
          caption:
            "Best observed validation classification results included 91.25% accuracy and an 88.38% F1-score.",
          fit: "contain",
        },
      ],
    },
    {
      id: "evaluation",
      eyebrow: "06 · Evaluation",
      title: "Evaluating verification quality beyond headline accuracy",
      paragraphs: [
        "The strongest validation verification accuracy was 91.37%, with 91.52% precision, 91.38% recall, and a 91.36% F1-score. The best ROC-AUC reached 96.28%, while the lowest equal error rate was 8.63%.",
        "Threshold calibration was one of the most important challenges. A face verification system must balance false accepts against false rejects, so accuracy alone is not sufficient. At a target false-accept rate of approximately 1%, the best validation true-accept rate was 85.27%. The correct operating threshold should still be recalibrated for each deployment environment and risk level.",
      ],
      bullets: [
        "Best validation verification accuracy: 91.37%",
        "Best validation ROC-AUC: 96.28%",
        "Lowest validation EER: 8.63%",
        "Best validation TAR@FAR=1%: 85.27%",
      ],
      figures: [
        {
          src: "/images/case-studies/face-recognition-system/verification_classification_metrics.png",
          alt: "Verification accuracy, precision, recall, and F1-score across 100 epochs",
          caption:
            "Verification classification metrics stabilized around 91% after the major learning-rate reductions.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/face-recognition-system/eer_auc.png",
          alt: "Equal error rate and ROC-AUC curves for training and validation",
          caption:
            "The validation run reached a minimum EER of 8.63% and a maximum ROC-AUC of 96.28%.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/face-recognition-system/tar_far.png",
          alt: "True accept rate at a target false accept rate across training",
          caption:
            "TAR at the approximately 1% FAR operating point peaked at 85.27% on validation data.",
          fit: "contain",
        },
      ],
    },
    {
      id: "reflection",
      eyebrow: "07 · Reflection",
      title: "Compact deployment does not remove data and privacy risk",
      paragraphs: [
        "The project demonstrated that a compact backbone can support a complete real-time recognition workflow, but the reported numbers come from the training and validation split rather than an independent deployment benchmark. Lighting, pose, camera quality, demographics, occlusion, and threshold choice can all shift real-world performance.",
        "A stronger follow-up would evaluate independent datasets, report performance across demographic and image-quality groups, calibrate thresholds for each use case, encrypt stored embeddings, and define retention and deletion controls. Any real deployment should be opt-in and include a human-controlled fallback when recognition is uncertain.",
      ],
      bullets: [
        "Evaluate on independent datasets and deployment-specific camera conditions.",
        "Measure demographic and image-quality performance instead of relying on aggregate metrics.",
        "Protect biometric templates with access controls, encryption, and deletion policies.",
        "Use consent, transparent purpose limitation, and human review for consequential actions.",
      ],
    },
  ],
};
