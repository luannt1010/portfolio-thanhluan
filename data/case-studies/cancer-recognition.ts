import type { CaseStudy } from "@/data/case-studies/types";

// Edit this object to update the Cancer Recognition case study.
// Images live in public/images/case-studies/cancer-recognition/.
export const cancerRecognitionCaseStudy: CaseStudy = {
  slug: "lung-colorectal-cancer-recognition",
  title: "Lung and Colorectal Cancer Recognition Using CNN",
  eyebrow: "Deep Learning · Medical Image Classification",
  summary:
    "A two-person research prototype that uses a custom convolutional neural network to classify lung and colorectal histopathology images across five tissue classes.",
  heroImage: "/images/projects/cancer-detection.avif",
  heroAlt:
    "Preview for the lung and colorectal histopathology image classification project",
  repositoryUrl:
    "https://github.com/luannt1010/Lung-Colon-Detection-Project.git",
  accent: "#be123c",
  disclaimer:
    "This project was developed for educational and research purposes. It is not a medical device and must not be used as a substitute for professional diagnosis.",
  facts: [
    { label: "Role", value: "Machine Learning Developer" },
    { label: "Project type", value: "Research prototype" },
    { label: "Team", value: "2 members" },
    { label: "Architecture", value: "Custom CNN" },
  ],
  metrics: [
    {
      value: "25,000",
      label: "Histopathology images",
      detail: "Five balanced classes",
    },
    {
      value: "99.56%",
      label: "Test accuracy",
      detail: "2,500-image test set",
    },
    {
      value: "0.9956",
      label: "Weighted F1-score",
      detail: "Precision and recall also 0.9956",
    },
    {
      value: "21.15M",
      label: "Total parameters",
      detail: "Total / trainable: 21,154,245 · Non-trainable: 0",
    },
  ],
  technologies: [
    "Python",
    "TensorFlow",
    "Keras",
    "NumPy",
    "Pandas",
    "scikit-learn",
    "Pillow",
    "Matplotlib",
    "Seaborn",
    "Jupyter Notebook",
    "CNN",
    "Data Augmentation",
    "Medical Image Classification",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "01 · Context",
      title: "Exploring consistent preliminary analysis of complex tissue patterns",
      paragraphs: [
        "Histopathology remains an important part of lung and colorectal cancer assessment, but reviewing tissue images is specialist work and visually similar patterns can be difficult to distinguish. This project explores how a deep learning classifier could support large-scale preliminary image analysis in an educational research setting.",
        "The system was co-developed by a two-person team. The goal was to design a reproducible image pipeline, train a custom CNN from scratch, and evaluate both its aggregate performance and its class-level failure modes.",
      ],
      bullets: [
        "Classify five lung and colorectal tissue categories from JPEG images.",
        "Target more than 90% classification accuracy on a balanced dataset.",
        "Document model limitations instead of treating high benchmark accuracy as clinical readiness.",
      ],
    },
    {
      id: "dataset",
      eyebrow: "02 · Dataset",
      title: "A balanced 25,000-image training pipeline",
      paragraphs: [
        "The experiment used the LC25000 Lung and Colon Histopathological Image Dataset. It contains 25,000 JPEG images at 768 × 768 pixels, evenly distributed across five classes with 5,000 images per class.",
        "Image paths and labels were organized in a Pandas dataframe before a stratified 80/10/10 split. Inputs were resized to 224 × 224 RGB. Training-only augmentation introduced rotation, horizontal flips, width and height shifts, zoom, and brightness variation.",
      ],
      bullets: [
        "Colon adenocarcinoma",
        "Benign colon tissue",
        "Lung adenocarcinoma",
        "Benign lung tissue",
        "Lung squamous cell carcinoma",
      ],
      figures: [
        {
          src: "/images/case-studies/cancer-recognition/dataset-split.jpg",
          alt: "Pie chart showing an 80 percent training, 10 percent validation, and 10 percent test split",
          caption:
            "Stratified split used throughout the experiment: 20,000 training, 2,500 validation, and 2,500 test images.",
          fit: "contain",
        },
      ],
    },
    {
      id: "architecture",
      eyebrow: "03 · Architecture",
      title: "A custom CNN that grows from local texture to tissue-level structure",
      paragraphs: [
        "The final model is a custom CNN rather than a transfer-learning architecture. Thirteen 3 × 3 convolutional layers are grouped into five feature-extraction blocks, with filter counts increasing from 64 to 512 as spatial resolution decreases.",
        "Five max-pooling layers reduce the feature maps from 224 × 224 to 7 × 7. The resulting tensor is flattened and passed through dense layers with 256 and 64 ReLU units before a five-class Softmax output.",
      ],
      bullets: [
        "13 Conv2D layers and 5 MaxPooling2D layers",
        "Dense classification head: 256 → 64 → 5",
        "Approximately 21.15 million trainable parameters",
        "Categorical cross-entropy objective",
      ],
      figures: [
        {
          src: "/images/case-studies/cancer-recognition/cnn-architecture.jpg",
          alt: "Three-dimensional visualization of the custom CNN architecture",
          caption:
            "The custom architecture progressively compresses spatial dimensions while expanding its learned feature channels.",
          fit: "contain",
        },
      ],
    },
    {
      id: "training",
      eyebrow: "04 · Training",
      title: "Twenty epochs with targeted augmentation and monitored validation",
      paragraphs: [
        "The custom CNN was trained for 20 epochs with the Adamax optimizer, a learning rate of 0.001, a batch size of 64, and categorical cross-entropy loss. The complete run took approximately 23 hours in the reported development environment.",
        "At epoch 20, the selected validation results were 98.60% accuracy and 0.0483 loss. The training curves show rapid early convergence followed by smaller improvements and some validation fluctuation, which informed the later discussion of overfitting risk.",
      ],
      bullets: [
        "Training accuracy: 99.63%",
        "Validation accuracy: 98.60%",
        "Validation loss: 0.0483",
        "Training augmentation applied through Keras ImageDataGenerator",
      ],
      figures: [
        {
          src: "/images/case-studies/cancer-recognition/training-curves.png",
          alt: "Training and validation loss and accuracy curves across 20 epochs",
          caption:
            "Loss and accuracy curves from the 20-epoch training run. Validation fluctuations remain important when interpreting the final benchmark result.",
          fit: "contain",
        },
      ],
    },
    {
      id: "results",
      eyebrow: "05 · Evaluation",
      title: "Strong benchmark performance with concentrated lung-class errors",
      paragraphs: [
        "On the balanced 2,500-image test set, the model reported 99.56% accuracy, 0.0131 categorical cross-entropy loss, and weighted precision, recall, and F1-score of 0.9956. A simpler three-layer CNN baseline reached approximately 75% accuracy under the reported comparison.",
        "All colon adenocarcinoma, benign colon, and benign lung test images were classified correctly. The remaining errors were concentrated between lung adenocarcinoma and lung squamous cell carcinoma, which share similar histological characteristics.",
      ],
      bullets: [
        "492/500 lung adenocarcinoma images classified correctly",
        "Seven lung adenocarcinoma images predicted as lung squamous cell carcinoma",
        "One lung adenocarcinoma image predicted as benign lung tissue",
        "Three lung squamous cell carcinoma images predicted as lung adenocarcinoma",
      ],
      figures: [
        {
          src: "/images/case-studies/cancer-recognition/confusion-matrix.png",
          alt: "Confusion matrix for the five-class cancer recognition test set",
          caption:
            "Confusion matrix for the 2,500-image test set. Eleven errors are concentrated in the two malignant lung classes.",
          fit: "contain",
        },
      ],
    },
    {
      id: "limitations",
      eyebrow: "06 · Reflection",
      title: "High benchmark accuracy is a starting point, not clinical validation",
      paragraphs: [
        "LC25000 was expanded from a smaller collection of original tissue images through augmentation. A stronger follow-up evaluation should group related source images before splitting and test the model on independent clinical cohorts to reduce data-leakage risk and measure real-world generalization.",
        "The model is also relatively large for the task. Future experiments could compare stronger regularization, a lighter architecture, source-aware cross-validation, explainability methods, and carefully controlled transfer-learning baselines.",
      ],
      bullets: [
        "Validate on independent data from different laboratories and scanners.",
        "Investigate Dropout, weight decay, early stopping, and source-aware splitting.",
        "Add interpretability techniques to examine which tissue regions drive predictions.",
        "Treat outputs as research evidence, never as medical advice or an autonomous diagnosis.",
      ],
    },
  ],
};
