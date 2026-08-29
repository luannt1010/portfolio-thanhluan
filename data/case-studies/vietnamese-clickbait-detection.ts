import type { CaseStudy } from "@/data/case-studies/types";

// Edit this object to update the Vietnamese Clickbait Detection case study.
// Images live in public/images/case-studies/vietnamese-clickbait-detection/.
export const vietnameseClickbaitDetectionCaseStudy: CaseStudy = {
  slug: "vietnamese-clickbait-detection",
  title: "Vietnamese Clickbait Detection with PhoBERT",
  eyebrow: "Natural Language Processing · Text Classification · Model Serving",
  summary:
    "A personal end-to-end Vietnamese NLP project that curates a nearly balanced news dataset, fine-tunes PhoBERT, tunes a validation threshold, and serves predictions from text, article URLs, and uploaded files.",
  heroImage: "/images/projects/vietnamese-clickbait-detection.webp",
  heroAlt: "Preview of the Vietnamese clickbait detection project",
  repositoryUrl:
    "https://github.com/luannt1010/PhoBert-VietNamClickBait-Recognize.git",
  accent: "#9b5de5",
  disclaimer:
    "Clickbait labels are probabilistic and depend on the dataset, editorial style, and selected decision threshold. This personal prototype is intended to support content review and experimentation, not to make autonomous judgments about publishers or individual authors.",
  facts: [
    { label: "Role", value: "AI Developer" },
    { label: "Project type", value: "Personal project" },
    { label: "Final dataset", value: "6,186 articles" },
    { label: "Model", value: "PhoBERT base-v2" },
  ],
  metrics: [
    {
      value: "83.55%",
      label: "Test accuracy",
      detail: "last.pth evaluated at threshold 0.07",
    },
    {
      value: "83.55%",
      label: "Test F1-score",
      detail: "Exact JSON result: 0.8354838709677419",
    },
    {
      value: "85.90%",
      label: "Tuned validation F1",
      detail: "Best validation threshold: 0.07",
    },
    {
      value: "91.28 min",
      label: "Training time",
      detail: "30 epochs on an RTX 4050 6 GB",
    },
  ],
  technologies: [
    "Python",
    "PyTorch",
    "PhoBERT",
    "Transformers",
    "PyVi",
    "Pandas",
    "Scikit-learn",
    "FastAPI",
    "Streamlit",
    "Web Crawling",
    "CSV / Excel",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "01 · Context",
      title: "Detecting Vietnamese clickbait beyond headline keywords",
      paragraphs: [
        "This personal project addresses binary classification of Vietnamese news content: clickbait is labeled 1 and non-clickbait is labeled 0. Instead of relying only on isolated keywords, the model learns from a combined representation of the title, lead paragraph, and available body preview.",
        "The objective was to build more than a training notebook. The final workflow covers data consolidation, Vietnamese text preparation, PhoBERT fine-tuning, validation threshold tuning, held-out test evaluation, command-line inference, API serving, and an interactive application.",
      ],
      bullets: [
        "Classify Vietnamese news content as clickbait or non-clickbait.",
        "Support typed titles, article URLs, and batch CSV or Excel prediction.",
        "Keep training, threshold tuning, evaluation, crawling, and inference reproducible.",
      ],
    },
    {
      id: "system",
      eyebrow: "02 · Pipeline",
      title: "From raw Vietnamese text to a probability and final label",
      paragraphs: [
        "Raw article text is cleaned and segmented with PyVi before PhoBERT tokenization. PhoBERT base-v2 encodes the Vietnamese sequence, and a multi-layer binary classification head converts the contextual representation into a clickbait logit and probability.",
        "The same inference layer supports three application paths. Users can enter a title directly, provide an article URL for crawling and extraction, or upload a CSV or Excel file for batch processing. FastAPI exposes prediction services while Streamlit provides the interactive interface.",
      ],
      bullets: [
        "Vietnamese word segmentation with PyVi before PhoBERT tokenization.",
        "PhoBERT encoder followed by four classifier parameter groups.",
        "CLI, FastAPI, and Streamlit interfaces reuse the trained model.",
        "Web crawling utilities extract Vietnamese article content for prediction.",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/pipeline.jpg",
          alt: "Vietnamese clickbait detection pipeline from raw text to the final prediction",
          caption:
            "End-to-end pipeline covering preprocessing, PyVi segmentation, PhoBERT encoding, classification, and prediction delivery.",
          fit: "contain",
        },
      ],
    },
    {
      id: "dataset",
      eyebrow: "03 · Dataset",
      title: "Combining four sources with targeted self-crawled samples",
      paragraphs: [
        "Four available Vietnamese clickbait datasets were consolidated with additional news articles collected through the project crawler. The self-crawled pool contained 4,165 articles; 627 label-1 samples were selected to reduce the original class imbalance rather than adding the complete pool indiscriminately.",
        "The combined data initially contained 6,188 rows. After removing two duplicates, the final dataset contained 6,186 articles and remained nearly balanced. It was split into 4,948 training samples, 618 validation samples, and 620 held-out test samples.",
      ],
      bullets: [
        "Final dataset after deduplication: 6,186 articles",
        "Train / validation / test: 4,948 / 618 / 620",
        "Self-crawled pool: 4,165 articles",
        "Selected self-crawled positive samples: 627",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/4-dataset-orig-dist.png",
          alt: "Label distributions across the four original Vietnamese clickbait datasets",
          caption:
            "Label distributions in the four source datasets before the targeted self-crawled samples were added.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/self-crawl-dist.png",
          alt: "Label distribution of the self-crawled Vietnamese news dataset",
          caption:
            "The self-crawled pool contained 4,165 articles and was used selectively to address the positive-class shortage.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/combine-all-dist.png",
          alt: "Near-balanced label distribution after combining and deduplicating all selected data",
          caption:
            "Final combined data after targeted balancing and duplicate removal, producing 6,186 usable samples.",
          fit: "contain",
        },
      ],
    },
    {
      id: "model",
      eyebrow: "04 · Model",
      title: "Fine-tuning PhoBERT with a weighted binary objective",
      paragraphs: [
        "PhoBERT base-v2 was fine-tuned with a four-stage classification head. Inputs were limited to 256 tokens and regularized with a dropout rate of 0.3. The model was optimized end to end rather than using PhoBERT as a frozen feature extractor.",
        "Class imbalance was handled inside the objective as well as during data curation. The positive weight was calculated from the training-label counts and passed to BCEWithLogitsLoss, increasing the penalty for mistakes on the underrepresented positive class.",
      ],
      bullets: [
        "Backbone: PhoBERT base-v2",
        "Maximum sequence length: 256 tokens",
        "Classifier dropout: 0.3",
        "Loss: BCEWithLogitsLoss with training-derived pos_weight",
      ],
    },
    {
      id: "training",
      eyebrow: "05 · Training",
      title: "Separate learning rates for the language model and classifier",
      paragraphs: [
        "AdamW optimized PhoBERT and the classification layers through separate parameter groups. The backbone used a learning rate of 5e-6, while the four classifier groups used 2e-5, with weight decay set to 0.01. ReduceLROnPlateau monitored validation loss and reduced the learning rate when improvement stalled.",
        "The run completed 30 epochs with a batch size of 16 in 91.275 minutes. Training was performed on an RTX 4050 GPU with 6 GB VRAM, a Ryzen 7 7735HS processor, and 16 GB of RAM.",
      ],
      bullets: [
        "Optimizer: AdamW · weight decay: 0.01",
        "Backbone LR: 5e-6 · classifier LR: 2e-5",
        "Scheduler: ReduceLROnPlateau on validation loss",
        "30 epochs · batch size 16 · 91.275 minutes",
        "Hardware: RTX 4050 6 GB · Ryzen 7 7735HS · 16 GB RAM",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/loss_acc.png",
          alt: "Training and validation loss and accuracy across 30 epochs",
          caption:
            "Training and validation loss and accuracy across the complete 30-epoch run.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/precision_recall.png",
          alt: "Training and validation precision and recall across 30 epochs",
          caption:
            "Precision and recall histories used to inspect generalization and class-level behavior.",
          fit: "contain",
        },
      ],
    },
    {
      id: "evaluation",
      eyebrow: "06 · Evaluation",
      title: "Tuning on validation data, then evaluating last.pth on the test set",
      paragraphs: [
        "Threshold tuning on the validation set selected 0.07. At that threshold, validation accuracy was 86.0841%, precision was 85.0649%, recall was 86.7550%, and F1-score was 85.9016%. These values are reported directly from best_threshold.json.",
        "The final held-out evaluation used last.pth with the same 0.07 threshold. Test accuracy was 83.5484%, precision and recall were both 83.7715%, and F1-score was 83.5484%, matching eval_on_test_set.json. The Streamlit application uses a separate 0.5 classification threshold and its outputs should therefore not be presented as the source of the tuned test metrics.",
      ],
      bullets: [
        "Validation threshold: 0.07",
        "Tuned validation F1-score: 0.8590163934426229",
        "Test accuracy: 0.8354838709677419",
        "Test F1-score: 0.8354838709677419",
        "Application classification threshold: 0.5",
      ],
      figures: [
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/f1_roc.png",
          alt: "Validation F1 history and ROC curve for Vietnamese clickbait detection",
          caption:
            "F1 history and ROC analysis used alongside validation threshold tuning.",
          fit: "contain",
        },
        {
          src: "/images/case-studies/vietnamese-clickbait-detection/roc_curve_confusion_matrix.png",
          alt: "ROC curve and confusion matrix for the held-out test set",
          caption:
            "Held-out test evaluation using last.pth and the validation-selected threshold of 0.07.",
          fit: "contain",
        },
      ],
    },
    {
      id: "reflection",
      eyebrow: "07 · Reflection",
      title: "Balancing data quality, overfitting risk, and operating thresholds",
      paragraphs: [
        "The first challenge was class imbalance. Targeted positive examples and a weighted loss improved the learning signal, but selectively adding crawled label-1 articles can also introduce source or annotation bias. Duplicate removal, source-aware evaluation, and consistent labeling rules are therefore as important as the model architecture.",
        "The second challenge was generalization. Training metrics approached 99.9% while validation performance remained around the mid-80% range, and validation loss reached its minimum earlier than the end of training. This gap signals overfitting risk and makes checkpoint selection, regularization, threshold tuning, and independent test evaluation essential.",
      ],
      bullets: [
        "Track performance by data source instead of relying only on aggregate metrics.",
        "Review labeling consistency for ambiguous or editorially styled headlines.",
        "Compare best-validation and final checkpoints in future experiments.",
        "Calibrate the application threshold against its real error costs and user workflow.",
      ],
    },
  ],
};
