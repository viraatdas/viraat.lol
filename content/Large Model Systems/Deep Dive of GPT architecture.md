
## 1. Data Structuring
**Preprocessing**
- Cleaning
- [[Tokenization]]: 
- [[Sequence Creation]]: Sequences of fixed length (eg. 512 tokens) are created, and special tokens like `[START]` and `[END]` may be added to denote the beginning and end of sequences.`

## 2. Model Architecture
**Core components**
- [[Transformers]]

**Block Structure**
- [[Embedding Layer]]: 
- [[Transformer Blocks]]
	- Mulit-head Self-attention Layer
	- Feedforward Neural Network
- [[Normalization and Residual Connections]]

**Output Layer**
- output of the last transformer block is passed to a final linear layer, which projects the hidden stat eback to the size of the vocabulary. This is followed by a softmax layer to generate probabilities of the next token. 


## 3. Training
GPT is trained to predict the next token in the sequence given the previous tokens, maximizing the likelihood of the next token based on the preciding context.

**Loss function**: Cross-entropy loss is used, where the model learns to reduce the discrepancy between predicted probability distribution and the actual distrbution token in the training data

