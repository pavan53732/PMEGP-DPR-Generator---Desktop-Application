# Parity Test Matrix

To achieve 100% rule coverage for the Layer 1 Parity Engine, the testing matrix must execute every possible permutation of the following PMEGP variables against the golden dataset.

## 1. Variables

| Variable | Values |
|----------|--------|
| **Activity Type** | Manufacturing (1), Service (2) |
| **Area** | Rural (1), Urban (2) |
| **Category** | General (1), Special/SC/ST/OBC/Minority/Women/Ex-Servicemen/PHC/Hill Border (2-9) |
| **Project Cost** | Below Cap, Exactly Cap, Above Cap |
| **Gender** | Male (1), Female (2), Transgender (3) |
| **Education** | Below 8th (1), 8th Pass (2), Above 8th (3) |

*Note: For Project Cost, the caps differ by Activity Type (Mfg: 25L, Service: 10L in standard legacy rules).*

## 2. Permutation Strategy
Generating tests for every exact combination yields:
`2 (Activity) * 2 (Area) * 9 (Category) * 3 (Cost Tiers) * 3 (Gender) * 3 (Education) = 972 Scenarios`

To optimize, we collapse the mathematically identical categories (e.g., all Special categories receive the same subsidy rules) into a single "Special" bucket, reducing permutations to:
`2 (Activity) * 2 (Area) * 2 (Category: Gen/Special) * 3 (Cost Tiers) * 3 (Gender) * 3 (Education) = 216 Scenarios`

We select 100 core scenarios spanning these reduced permutations, prioritizing boundary conditions (Exactly Cap) and invalid conditions (Above Cap with Below 8th education).

## 3. Acceptance Criteria
For a scenario to pass:
1. `Calculated Subsidy Amount` == `Expected Subsidy Amount`
2. `Calculated Margin Money` == `Expected Margin Money`
3. `Calculated Bank Loan` == `Expected Bank Loan`
4. Difference must be exactly `0` (Zero tolerance).
