
## Cuda basics
- Thread smallest unit of execution
- Block: group of threads that can share memory
- Grid group of blocks that executes a kernel across a dataset
## Memory hierarchy
- Registers: fastest memory, private to each thread
- Shared memory: shared among threads within the same block, faster than global memory but limited in size
- Global memory: accessible by all threads but slower than registers or shrared memory



Core reference: https://github.com/viraatdas/llm.c/blob/master/train_gpt2.c 

1. **Header inclusion and Definitions**
```C
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdint.h>
#include <assert.h>
#include <math.h>
#include <time.h>
#include <string.h>
#include <unistd.h>
#ifdef OMP
#include <omp.h>
#endif
```

2. **Core Functions (Forward and Backward Passes)**

`encoder_forward` Function

```C
__global__ void encoder_forward_kernel2(float* out,
                               int* inp, float* wte, float* wpe,
                               int B, int T, int C) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int N = B * T * C;

    if (idx < N) {
        int bt = idx / C;
        int b = bt / T;
        int t = bt % T;
        int c = idx % C;

        int ix = inp[b * T + t];

        float* out_btc = out + b * T * C + t * C + c;
        float* wte_ix = wte + ix * C + c;
        float* wpe_tc = wpe + t * C + c;
        *out_btc = *wte_ix + *wpe_tc;
    }
}

```
#### Parameters:

- **out**: Output array where the embeddings will be stored.
- **inp**: Input array containing token indices.
- **wte**: [[Token embeddings matrix]]
	- each row corresponds to a unique token (word or subword) in the models vocabulary
- **wpe**: [[Positional embeddings matrix]]
	- captures the positional information of tokens within the input data
- **B, T, C**: Dimensions representing Batch size, Sequence length, and Number of Channels (embedding dimension), respectively.


### Breakdown
- Kernel declaration: `__global__` indicates it's a CUDA kernel called from the host (CPU) and executed on the  device (GPU)
- Thread index calculation: 
	- `idx = blockIdx.x * blockDim.x + threadIdx.x;`: Calculates the global index of the thread across blocks.
- Dimension calculations:
	- `N = B * T * C;`: Total number of elements to process.
- Core computation
	- `int ix = inp[b * T + t];`: Fetches the index from the input array to select which embeddings to use.
	- `float* out_btc = out + b * T * C + t * C + c;`: Computes the pointer to the output location.
	- `float* wte_ix = wte + ix * C + c;`: Computes the pointer to the selected token embedding.
	- `float* wpe_tc = wpe + t * C + c;`: Computes the pointer to the position embedding.
	- `*out_btc = *wte_ix + *wpe_tc;`: Performs the addition of token and position embeddings and stores the result in the output array.
