resource: [[Gemini.pdf]]


## Model Architecture
- build on top of Transformer decoders
- Visual encoding was done based on the work of [[Flamingo]], [[Coca]], [[PaLI]]

- [[Video understanding]] is accomplished by encoding the video as a sequence of frames in the large context window. 
	- They can be interleaved naturally with text or audio as part of the model input
- Can also ingest audio signals at 16kHz from [[Universal Speech Model (USM)]]

## Training Infrastructure
- trained on [[TPUv5e]] and [[TPUv4]]

**TPUv4**: 
TPUv4 accelerators are deployed in "SuperPPods" of [[4096 chips]], each connected to a dedicated [[optical switch]], which can dynamically reconfogire `4x4x4` chip cubes into arbitrary 3d torus topologies in around 10 seconds. 


TPU accelerators communicate over high spped inter-chip-interconnect, but at Gemini ultra scale, we combine SuperPods in multiple datacenters using Google's intra-cluster and inter-cluster network. 


The [[single controller programming model of Jax]] and [[Pathways]] allows a single Python process to orchestrate the entire training run, dramatically simplifying the develoment workflow. 

The [[GSPMD practioner]] in the [[XLA]] compiler partitions the training step computation, and the [[MegaScale XLA]] compiler pass statically schedules


### Maintaining goodput
*goodput*: time spent computing useful new steps over the elapsed time of the training jobs 

They didn't use conventional approach of periodic checkpointing of weights to persistent cluster storage. Why?

The conventional approach of periodic checkpointing of weights to persistent cluster storage becomes highly impractical at the scale at which Gemini models operate for several reasons:

1. **Scale of the Model and Data**: Gemini models are trained on a very large scale, using a large fleet of TPU accelerators across multiple data centers. The sheer volume of data (model weights and states) that would need to be periodically saved is massive. Periodically writing this vast amount of data to storage would require substantial bandwidth and would significantly slow down the training process.
    
2. **Frequency of Hardware Failures**: At such a large scale, hardware failures become commonplace, not just a rare occurrence. Periodic checkpointing assumes a relatively stable hardware environment where failures are exceptions rather than the norm. Given the high rate of unplanned hardware failures, relying solely on periodic checkpointing would lead to frequent interruptions and potential data loss, making it a risky and inefficient approach for ensuring model state preservation.
    
3. **Recovery Time**: In the event of a failure, recovering the model state from persistent storage can be time-consuming, especially when dealing with the vast datasets and model sizes in question. This recovery process would significantly reduce the overall goodput of the training job, as the system would spend a non-trivial amount of time simply reloading data from storage, rather than performing useful computations.
    

To address these challenges, Gemini employs a strategy of making use of redundant in-memory copies of the model state. In the event of an unplanned hardware failure, the system can rapidly recover directly from an intact model replica, which is significantly faster than reloading from persistent storage. This approach allows for a substantial speedup in recovery time and minimizes the impact of hardware failures on the overall training process, thereby increasing the goodput from 85% to 97%​


For gemini, they instead made use of redundant in memory-copies of the model state and on any unplanned hardware failure, they rapidly recover directly from an intact model replica. This provides a substantial speedup in recovery, despite the significantly larger training resources.

### Interesting system failure modes
- [[Silent Data Corruption (SDC)]]



## Training Dataset
- trained on both multimodal and multilingual data
- pretraining uses data from web documents, books, and codde and includes image, audio, and video

**Details**:
- Used [[SentencePiece tokenizer]]
- The number of tokens used to train the largest models were determined following the approach in [[Hoffmann et al. (2022)]]. The smaller models are trained for significantly more tokens to improve performance for a given inference budget, similar to the approach advocated in [[Touvron et al. (2023a)]]


## Evaluation 

### Image generation
Gemini is able to output images natively, without having to rely on an intermediate natural language description that can bottleneck the model’s ability to express images. This uniquely enables the model to generate images with prompts using interleaved sequences of image and text in a few-shot setting.

We use multi-objective optimization with a weighted sum of reward scores from helpfulness, factuality, and safety, to train a multi-headed reward model.

