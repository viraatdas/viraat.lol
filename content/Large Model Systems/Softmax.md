$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_je^{z_j}}$$


$z$ is vector containing the raw class scores from the last layer of hte network, $e^{z_i}$ is the exponential of the score for class $i$, and the deonminator is the sum of exponentials of all raw class scores, which acts as a normalization constanct. 

