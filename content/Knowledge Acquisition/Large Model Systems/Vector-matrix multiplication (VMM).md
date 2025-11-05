
Vector-matrix multiplication is an operation in linear algebra where a vector is multiplied by a matrix. Here's how it works:

1. **Vector Definition**: A vector is a column or row of numbers. For example, a column vector \( \mathbf{v} \) might look like:
$$
   \[
   \mathbf{v} = \begin{bmatrix}
   v_1 \\
   v_2 \\
   v_3
   \end{bmatrix}
   \]
   $$

2. **Matrix Definition**: A matrix is a rectangular array of numbers arranged in rows and columns. For example, a matrix \( \mathbf{M} \) might look like:
$$
   \[
   \mathbf{M} = \begin{bmatrix}
   m_{11} & m_{12} & m_{13} \\
   m_{21} & m_{22} & m_{23} \\
   m_{31} & m_{32} & m_{33}
   \end{bmatrix}
   \]
   $$
   

3. **Multiplication Process**: To multiply a vector \( \mathbf{v} \) by a matrix \( \mathbf{M} \), the vector must be post-multiplied by the matrix (if the vector is a column vector). The resulting product is another vector where each element is the dot product of the original vector and each row of the matrix.
$$
   \[
   \mathbf{u} = \mathbf{M} \mathbf{v}
   \]
   $$

   For example, if \( \mathbf{v} \) is a 3-dimensional column vector and \( \mathbf{M} \) is a \( 3 \times 3 \) matrix, the resulting vector \( \mathbf{u} \) will be calculated as follows:
   $$
   \[
   \mathbf{u} = \begin{bmatrix}
   m_{11} & m_{12} & m_{13} \\
   m_{21} & m_{22} & m_{23} \\
   m_{31} & m_{32} & m_{33}
   \end{bmatrix}
   \begin{bmatrix}
   v_1 \\
   v_2 \\
   v_3
   \end{bmatrix}
   \]
   $$

   Each element \( u_i \) of the resulting vector \( \mathbf{u} \) is computed as:
   $$
   \[
   u_i = \sum_{j=1}^{n} m_{ij} v_j
   \]
   $$
   Where \( n \) is the number of elements in the vector \( \mathbf{v} \).

For example, if:
$$
\[
\mathbf{M} = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
, \quad \mathbf{v} = \begin{bmatrix}
v_1 \\
v_2 \\
v_3
\end{bmatrix}
\]
$$
Then the result of \( \mathbf{M} \mathbf{v} \) is:
$$
\[
\mathbf{u} = \begin{bmatrix}
1 \cdot v_1 + 2 \cdot v_2 + 3 \cdot v_3 \\
4 \cdot v_1 + 5 \cdot v_2 + 6 \cdot v_3 \\
7 \cdot v_1 + 8 \cdot v_2 + 9 \cdot v_3
\end{bmatrix}
\]
$$

In general, vector-matrix multiplication is fundamental in many applications, including computer graphics, engineering, physics, and machine learning.
