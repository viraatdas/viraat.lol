Source: https://www.youtube.com/watch?v=IGu7ivuy1Ag&t=1s 

*notes generated using [recall](https://app.getrecall.ai/install-extension/)* 
# How a Transformer works at inference vs training time
![](https://i.ytimg.com/vi/IGu7ivuy1Ag/maxresdefault.jpg)



[Source URL](https://www.youtube.com/watch?v=IGu7ivuy1Ag&t=1s)

## Transformer Architecture
- A Transformer consists of an encoder and a decoder.
- The encoder converts the input IDs into a sequence of hidden states (embedding vectors).
- The decoder generates text one token at a time conditioned on the encoder's final hidden states and the decoder input IDs.
- The language modeling head maps the final hidden state of the Transformer decoder to a vector of logits for each token in the vocabulary.
## Inference
- At inference time, the Transformer doesn't generate the entire translation in one go.
- The source sentence is tokenized and converted into input IDs.
- The model generates text one token at a time by selecting the token with the highest logit score at each time step.
- The generation process continues until the decoder predicts the end-of-sequence token.
## Training
- At training time, the source and target sentences are tokenized and converted into input IDs.
- The encoder generates final hidden states for the source sentence, which are fed to the decoder along with the decoder input IDs.
- The decoder outputs a sequence of hidden states, which are then passed through a language modeling head to compute logits for each token.
- The cross-entropy loss between the ground truth labels and the model's predictions is computed, and the loss is backpropagated to update the model's weights.
- During training, multiple sequences are typically batched together, and the input IDs and labels are padded to ensure a fixed sequence length.
- The model is trained using a single forward pass with teacher forcing.