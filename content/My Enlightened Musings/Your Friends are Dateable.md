---
title: "Your Friends are Dateable"
date: 2024-05-14
tags: ["mathematics", "relationships", "friendship"]
---

[Substack link](https://viraat.substack.com/p/your-friends-should-be-dateable)

<div style="text-align: center;">
  <img src="enlightenment.png" alt="" style="width: 50%; height: auto;">
</div>

*Number of dates you can go with an individual is a proxy of strength of the friendship*

# Abstract

We introduce a mathematical framework aimed at quantifying the potential depth of friendship between individuals, thus challenging conventional qualitative paradigms in the analysis of personal relationships. According to our framework, the robustness of a friendship can be quantitatively inferred from one's willingness to engage in "dates," effectively using the potential "number of dates" as an indicator of friendship depth. Our methodology integrates the constructs of 'width'—representing the diversity of interests, values, and other relevant variables—and 'breadth,' denoting the intensity of these shared dimensions. By leveraging multidimensional matrices that map the 'width' and 'depth', $\phi_{me}$ and $\phi_{them}$, alongside a composite function $f$, we can identify interpersonal synergies, thereby facilitating a structured assessment of the viability of friendships. This transition towards a quantitative exploration of relationship dynamics offers a neat perspective on the role of friendship as a fundamental component of interpersonal relationships.

# Methodology

Our methodology utilizes the constructs $\phi_{me}$ and $\phi_{them}$ which are both multidimensional matrices to model the width—representing the diversity of interests, values, and other relevant variables, and the depth—indicating the intensity of these attributes. The current paper doesn't investigate embedding techniques for the matrices, but the effects of this should be studied in future papers as it could yield to better representation of $\phi$.

Visualization of the matrix representations for $\phi_{me}$ and $\phi_{them}$. These profiles illustrate the diversity of shared traits (width) and their intensity (depth), laying the groundwork for understanding interpersonal dynamics.

Evaluating compatibility and friendship depth, we introduce a composite function, $f$, that synthesizes individual profiles into a new composite profile $\phi_{new}$:

$$
\phi_{new} = f(\phi_{me}, \phi_{them})
$$

To measure the impact of this synthesis, we employ a differential metric, $\Delta\phi$, which quantifies the divergence between the combined profile $\phi_{new}$ and the individual profiles:

$$
\Delta\phi_{new-me} = \|\phi_{new} - \phi_{me}\|
$$

$$
\Delta\phi_{new-them} = \|\phi_{new} - \phi_{them}\|
$$

A greater $\Delta\phi$ suggests a richer potential for diverse and enriching experiences between individuals, predicated on the introduction of novel elements into the relationship.

