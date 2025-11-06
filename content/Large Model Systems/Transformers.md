Source: https://arxiv.org/pdf/1706.03762

## Attention

### Scaled Dot-Production Attention

**Attention** function is described as mapping a query and a set of key-value pairs to an output. Output is a weighted sum of the values weighting assigned to each values is computated by a compatibility function of the query with the corresponding keys

**Details**:
- **Inputs**: The inputs to the attention mechanism are [[queries (Q), keys (K), and values (V)]]. These are all vectors. In the context of the Transformer, these vectors are usually outputs from the previous layer of the model.
- **Dot Products of Queries and Keys**: The first step in calculating attention is to find the dot products of the query with all keys. This represents a measure of compatibility or similarity, with higher values indicating greater compatibility.
- **Scaling**: Each dot product is scaled by the inverse square root of the dimension of the keys, $\frac{1}{\sqrt{d_k}}$. This scaling factor helps prevent the dot product values from growing too large in magnitude, which can lead to computational instability due to the [[Softmax]] function operating in regions where it has extremely small gradients.
- **Softmax**: Next, a softmax function is applied to the scaled dot products. This step converts the scores into probabilities that sum to one. The softmax essentially picks out the highest scores, magnifying their importance.
- **Output**: The output is computed as a weighted sum of the values V. Each value is weighted by the softmax score, ensuring that values corresponding to more compatible keys contribute more to the result.

**Equation**
$\text{Attention(Q,K,V)} = \text{softmax}(QK^T/\sqrt{d_k})V$

### Example setup
For our example, let's consider the simple sentence: **"The quick brown fox jumps."**

### Step 1: Tokenization

The first step in processing this sentence for a model like the Transformer is tokenization. Tokenization is the process of splitting the text into manageable pieces or tokens. Depending on the model setup, this could be words, subwords, or even characters. For simplicity, let's assume word-level tokenization here:

- Tokens: ["The", "quick", "brown", "fox", "jumps"]

### Step 2: Embedding

Each token is then converted into a numerical form known as an embedding. These embeddings are typically learned during training and are capable of capturing semantic meanings of the words. Suppose we're using an embedding dimension of 4 for simplicity (real models use much larger dimensions like 512). After embedding, each word might be represented as follows:

- "The": [0.1,0.2,0.3,0.4][0.1,0.2,0.3,0.4]
- "quick": [0.5,0.6,0.7,0.8][0.5,0.6,0.7,0.8]
- "brown": [0.9,1.0,1.1,1.2][0.9,1.0,1.1,1.2]
- "fox": [1.3,1.4,1.5,1.6][1.3,1.4,1.5,1.6]
- "jumps": [1.7,1.8,1.9,2.0][1.7,1.8,1.9,2.0]

### Step 3: Generating Queries, Keys, and Values

In the Transformer, each token’s embedding is used to generate queries, keys, and values. This is done through different linear transformations (i.e., different sets of weights). For simplicity, let’s assume these transformations just reshape the embeddings a bit (in practice, they would be learned matrices). We'll use simplified transformations:

- **Queries (Q)**, **Keys (K)**, and **Values (V)** might end up looking something like:
    - "The": Q=[0.1,0.2],K=[0.2,0.1],V=[0.3,0.4]
    - "quick": Q=[0.5,0.6],K=[0.6,0.5],V=[0.7,0.8]
    - "brown": Q=[0.9,1.0],K=[1.0,0.9],V=[1.1,1.2]
    - "fox": Q=[1.3,1.4],K=[1.4,1.3],V=[1.5,1.6]
    - "jumps": Q=[1.7,1.8],K=[1.8,1.7],V=[1.9,2.0]

### Step 4: Calculating Attention for One Word

Let's focus on calculating the attention for the word "quick":

- Compute dot products of "quick" query with all keys to measure compatibility.
- Apply a scaling factor and softmax to these scores to get probabilities.
- Use these probabilities to compute a weighted sum of the values, which gives you the attention output for "quick".

### Visualization:

This process essentially allows the model to "attend" to all words in the sentence when processing the word "quick", but to varying degrees based on how relevant each word is to "quick" (as determined by the softmax scores of their dot products).


## Practical application in transformer
In the Transformer, this attention mechanism is used in three different ways:

1. **Encoder self-attention**: Each position in the encoder can attend to all positions in the previous layer of the encoder.
2. **Decoder self-attention**: Each position in the decoder can attend to all positions up to and including that position in the decoder, using masking to preserve causality.
3. **Encoder-decoder attention**: Queries from the decoder attend to all positions in the encoder.


## [[How a Transformer works at inference vs training time]]




----
source: https://www.youtube.com/watch?v=ISNdQcPhsts

- [ ] Inouts -> Input Embeddings yo