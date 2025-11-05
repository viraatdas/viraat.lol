## What
Positional embeddings are vectors added to token embeddings to encode position of each token in the sequence or positional information of tokens within the input data. 

## Positional Embeddings?
- Vectors added to token embeddings to encode the position of each token in the sequence. 

## Structure of the positional embedding matrix
Given:
- B: Batch size
- T: Sequence length
- C: Embedding size 

The positional embedding matrix **wpe** has a shape of `[T, C]`. Each row corresponds to a positional embedding vector for a respective position in the sequence, and each column represents a dimension of the embedding space.

## Example:

Imagine a simplified scenario where:

- **T** = 4 (sequence length)
- **C** = 3 (embedding dimensions)

The positional embedding matrix might look like this:

```
wpe = [
    [0.1, 0.2, 0.3],  # Positional embedding for position 0
    [0.4, 0.5, 0.6],  # Positional embedding for position 1
    [0.7, 0.8, 0.9],  # Positional embedding for position 2
    [1.0, 1.1, 1.2]   # Positional embedding for position 3
]
```

## Understanding the role of numbers in the `wpe` matrix
Each element in the **wpe** matrix represents a feature of the position's embedding. Let's break down their meaning and function:

## How do these values affect processing?
**Learning During Training**: Initially, if the embeddings are randomly initialized, these values might not have a meaningful pattern. During training, through backpropagation, these values are adjusted to minimize prediction error, gradually learning to encode useful positional signals.


**Gradient Updates**: As the model is exposed to more data during training, the gradients (derived during backpropagation) update these values such that the positional information they encode helps the model predict the next word in a sentence more accurately or generate more coherent text.



