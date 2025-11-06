Converting a model from using FP (like 32-bit floats) to using lower-precision formats (like 8-bit integers). 

## How does quantization work?
1. [[Post-Training Static quantization]]: Entire model including weights and activations are converted to lower precision. Model is calibrated using a small calibration dataset to minimize the impact on accuracy. May not always have best accuracy. 
2. [[Dynamic Quantization]]: Weights quantized statically, but activations are quantized dynamocally at runtime. Method is often used for models wehre activation ranges can vary significantly depending on the input data. 
3. Quantization-Aware Training (QAT)


source: https://www.youtube.com/watch?v=0VdNflU08yA 

## Problem 
- Smallest Llama 2 has 7 billion parameters. If every parameter is 32 bit, then we need $\frac{7*10^9*32}{8*10^9} = 28 GB$ just to store parameters on disk
- For inference, we need to load all its parameters in memory

## How are integers represented in the CPU (or GPU)?
![[Pasted image 20240528232104.png]]


Python can represent arbitraty big numbers by using so [[BigNum arithmetic]]: each number is stored as an array of digits in base $2^{30}$
![[Pasted image 20240528232329.png]]

## How are floating point numbers represented?
[[IEEE-754 ]]

## Applying quantization
![[Pasted image 20240528235102.png]]

1. Quantization first happens
2. Then the integ arithmetic happens 
3. and then it's deuqnatized and sent to the next layer

## Types of qunatization

### Assymetric vs Symmetric quantization

![[Pasted image 20240529000302.png]]
![[Pasted image 20240529000456.png]]


## Low-precision matrix multiplication 
![[Pasted image 20240529181742.png]]


[[Multiply-Accumulate (MAC)]]

## How to choose range
Min-max:
- $\alpha = max(V)$
- $\beta = max(V)$
- Sensitive to outliers

Percentile