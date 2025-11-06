main resource [[Introduction_to_Modern_Cryptography.pdf]]


## Chapter 1: Introduction and classical ciphers

### Setting of Private-key encryption
- setting in which communicating parties share some secret information in advance is [[private-key]] (or symmetric-key) setting

**The syntax of encryption**
Private-key encryption scheme
- *key-generation algorithm*: `Gen` is a probabilistic algorithm that outputs a key `k` chosen according to some distribution 
- *encryption algorithm*: `Enc` take as a input a key `k` and a plantext `m` and outputs a ciphertext `c`  -> $Enc_k(m)$
- *decryption algorithm*: `Dec` takes input a key `k` and ciphertext `c` and outputs a plaintext `m` -> $Dec_k(c)$

Generating keys defines a key space $\mathscr{K}$  (i.e. set of all possible keys), and encryption scheme is defined over some set of possible plaintext messages denoted $\mathscr{M}$

Basic correct requirement of any encryption scheme is that for every key `k` by Gen and every plaintext messagr $m \in \mathscr{M}$, it holds that 
$Dec_k(Enc_k(m)) = m$

In words, an encryption scheme must have the property that decrypting a ciphertext (with the appropriate key) yields the original message that was encrypted.


**Keys and Kerckoff's principle**
If adversary knows the algorithm `Dec` as well as the key `k` shared by two communicating parties, then that adversary will be able to decrypt all communication between these parties. 

Kerckhoffs’ principle: The cipher method must not be required to be secret, and it must be able to fall into the hands of the enemy without inconvenience.


### Historical Ciphers and their crpytoanalysis

- Caesar's cipher 
- [[Mono-alphabetic substition]]
- [[The Vigenère (poly-alphabetic shift) cipher]]
