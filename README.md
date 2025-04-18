# T5-Base-Content-Tagging
This web application serves as an intelligent interface for inferring tags using a fine-tuned T5-base AutoTagging model. Users can input article content, and the app utilizes t5-base finetuned model to generate relevant and contextual tags, enhancing content organization and searchability.

## Deployed Site:
### https://content-tagging.vercel.app/

## Model Overview
The **t5_base_autotagging** model is a fine-tuned version of the **T5-base** model, a transformer-based architecture designed for text-to-text tasks. This model has been trained to predict relevant tags for a given input text, making it ideal for applications such as document categorization, content labeling, and content-based recommendations.

### Model Details:
- **Architecture**: T5 (Text-to-Text Transfer Transformer)
- **Pre-trained Model**: `google/t5-base`
- **Fine-tuning Task**: Automatic Tagging (Predicting tags for text data)
- **Training Loss**: 0.5004

---

## Intended Use Cases:
- **Automatic Tagging**: The model can be used to generate relevant tags for text documents automatically.
- **Content Categorization**: It categorizes articles, blog posts, and other content into predefined tags.
- **Metadata Generation**: Useful for generating metadata tags for content management systems, blogs, or websites.

---

## Limitations:
- **Tag Prediction Accuracy**: The accuracy of generated tags may vary based on input complexity and diversity. Tags may not always be perfectly relevant.
- **Generalization**: The model is fine-tuned on a specific dataset, so further training may be necessary for generalization to new or diverse domains.
- **Dataset Dependency**: Model performance is dependent on the training dataset's quality and coverage.

---

## Model Description

The model leverages the encoder-decoder architecture of the **T5 model**, which allows it to process input text and output a sequence of relevant tags. During fine-tuning, the model was trained on a specialized dataset consisting of text-tag pairs, where the text represents documents, articles, or passages, and the tags are relevant keywords or categories.

### Applications:
- Document classification
- Automatic tagging for content organization
- Metadata generation for content management systems

---

## Dataset

The dataset used to train the model consists of a collection of text-tag pairs where each text is associated with one or more tags. The data was sourced from publicly available tagged datasets and synthetic examples to ensure diversity.

- **Training Data**: The training data includes tagged datasets from various domains.
- **Evaluation Data**: An evaluation set was used to test the model's ability to generalize on unseen data.

---

## Training and Evaluation Details

### Training Hyperparameters:
- **Learning Rate**: 2e-05
- **Batch Size**: 8 (train and eval)
- **Epochs**: 30
- **Optimizer**: AdamW with betas=(0.9, 0.999), epsilon=1e-08
- **Scheduler**: Linear decay
- **Seed**: 42

### Training Loss per Epoch:
| Epoch | Training Loss | Validation Loss |
|-------|---------------|-----------------|
| 1     | 0.6489        | 0.5840          |
| 2     | 0.5754        | 0.5296          |
| 3     | 0.5182        | 0.5059          |
| ...   | ...           | ...             |
| 30    | 0.2941        | 0.5004          |

### Framework Versions:
- **Transformers**: 4.47.1
- **PyTorch**: 2.5.1+cu121
- **Datasets**: 3.2.0
- **Tokenizers**: 0.21.0

---

## Evaluation Metrics:
The model was evaluated using standard metrics for text generation and tagging tasks. Below are the results:

| Metric  | Score   |
|---------|---------|
| **ROUGE-1** | 0.6923 |
| **ROUGE-2** | 0.3731 |
| **ROUGE-L** | 0.6226 |
| **BLEU**    | 0.2578 |

These metrics indicate the effectiveness of the model in generating coherent and relevant tags for input text.

---

## Fine-Tuning

To fine-tune the model for additional tagging tasks or datasets, use the following steps:
1. **Dataset Preparation**: Ensure you have a dataset of text-tag pairs.
2. **Adjust Hyperparameters**: Depending on the dataset, consider adjusting hyperparameters such as learning rate, batch size, and epochs.
3. **Training Process**: Use the standard procedure with the AdamW optimizer and linear decay scheduler.

---

## Conclusion

The **t5_base_autotagging** model provides an efficient solution for automatic tagging of text data. It can be used in a variety of applications including document categorization, metadata generation, and content classification. However, to ensure optimal results for new tasks or datasets, further fine-tuning may be necessary.
