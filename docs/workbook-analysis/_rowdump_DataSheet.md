# DataSheet - Full Cell Dump

Dimensions: 268 rows

### Row 1

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A1 | 1 | DATA INPUT SHEET |  | s | A1:I1 |

### Row 5

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A5 | 1 | Preference for sponsoring agency of the project : |  | s | A5:G5 |
| H5 | 8 | (mark √ ) |  | s | H5:I5 |

### Row 6

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A6 | 1 |  Unit Location (As per revenue record) : |  | s | A6:G6 |
| H6 | 8 | (mark √ ) |  | s | H6:I6 |

### Row 7

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B7 | 2 | KVIC |  | s |  |
| C7 | 3 | √ | IF(DataSheet!M59=1,"√"," ") | s |  |
| D7 | 4 | KVIB |  | s |  |
| E7 | 5 |   | IF(DataSheet!M59=2,"√"," ") | s |  |
| F7 | 6 | DIC |  | s |  |
| G7 | 7 |   | IF(DataSheet!M59=3,"√"," ") | s |  |
| H7 | 8 |   COIR Board |  | s |  |
| J7 | 10 |   | IF(DataSheet!M59=4,"√"," ") | s |  |

### Row 8

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A8 | 1 | 1.1 |  | n |  |
| B8 | 2 | Name of the Applicant/Institution |  | s | B8:F8 |

### Row 10

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A10 | 1 | 1.2 |  | n |  |

### Row 12

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A12 | 1 | 2 |  | n |  |
| B12 | 2 | Gender |  | s |  |
| D12 | 4 | Male |  | s |  |
| E12 | 5 | √ | IF(DataSheet!M55=1,"√"," ") | s |  |
| F12 | 6 | Female |  | s |  |
| G12 | 7 |   | IF(DataSheet!M55=2,"√"," ") | s |  |
| H12 | 8 | Transgender |  | s |  |
| I12 | 9 |   | IF(DataSheet!M55=3,"√"," ") | s |  |

### Row 13

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A13 | 1 | 3 |  | n |  |
| B13 | 2 | Address of the Proposed location of Unit: |  | s | B13:E13 |
| F13 | 6 | Rural |  | s |  |
| G13 | 7 | √ | IF(DataSheet!M64=1,"√"," ") | s |  |
| H13 | 8 | Urban |  | s |  |
| I13 | 9 |   | IF(DataSheet!M64<>1,"√"," ") | s |  |

### Row 16

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B16 | 2 | Taluk/Block: |  | s | B16:C16 |

### Row 17

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B17 | 2 | District: |  | s | B17:C17 |
| G17 | 7 | Pin: |  | s |  |

### Row 18

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B18 | 2 | State: |  | s |  |

### Row 19

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B19 | 2 | Email: |  | s |  |
| F19 | 6 | Mobile: |  | s |  |
| U19 | 21 | Urban |  | s |  |

### Row 21

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A21 | 1 | 4 |  | n |  |
| B21 | 2 | Qualification |  | s | B21:C21 |

### Row 22

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B22 | 2 | Academic |  | s | B22:D22 |
| E22 | 5 | Technical |  | s | E22:H22 |

### Row 23

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B23 | 2 | 12th Pass | INDEX(DataSheet!L83:L89,DataSheet!M83) | s | B23:D23 |

### Row 25

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A25 | 1 | 5 |  | n |  |
| B25 | 2 | Whether the applicant belongs to (mark √) |  | s |  |
| L25 | 12 | 0.35 | IF(DataSheet!M59=4,IF(AND(DataSheet!M56=1, DataSheet!M70=8),15%,25%),IF(AND(DataSheet!M56=1, DataSheet!M70=8),25%,35%)) | n |  |

### Row 26

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B26 | 2 | SC |  | s |  |
| C26 | 3 | ST  |  | s |  |
| D26 | 4 | OBC |  | s |  |
| E26 | 5 | PHC |  | s |  |
| F26 | 6 | Ex- Service man |  | s |  |
| G26 | 7 | Minority |  | s |  |
| H26 | 8 | Hill Border Area |  | s |  |
| I26 | 9 | Aspirational Districts |  | s |  |
| J26 | 10 | General |  | s |  |

### Row 27

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B27 | 2 | √ | IF(DataSheet!M70=1,"√"," ") | s |  |
| C27 | 3 |   | IF(DataSheet!M70=2,"√"," ") | s |  |
| D27 | 4 |   | IF(DataSheet!M70=3,"√"," ") | s |  |
| E27 | 5 |   | IF(DataSheet!M70=4,"√"," ") | s |  |
| F27 | 6 |   | IF(DataSheet!M70=5,"√"," ") | s |  |
| G27 | 7 |   | IF(DataSheet!M70=6,"√"," ") | s |  |
| H27 | 8 |   | IF(DataSheet!M70=7,"√"," ") | s |  |
| I27 | 9 |   | IF(DataSheet!M70=8,"√"," ") | s |  |
| J27 | 10 |   | IF(DataSheet!M70=9,"√"," ") | s |  |

### Row 29

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A29 | 1 | 6 |  | n |  |
| B29 | 2 | Whether the project (mark √) |  | s | B29:C29 |
| F29 | 6 | Manufacturing Unit |  | s |  |
| G29 | 7 | √ | IF(DataSheet!M80=1,"√"," ") | s |  |
| H29 | 8 | Service Unit |  | s |  |
| I29 | 9 |   | IF(DataSheet!M80=2,"√"," ") | s |  |

### Row 31

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| A31 | 1 | 8 |  | n |  |
| B31 | 2 | Name of the project / business activity proposed : |  | s | B31:G31 |

### Row 34

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B34 | 2 | Legal Status: |  | s |  |

### Row 36

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B36 | 2 | Land |  | s | B36:E36 |
| M36 | 13 | #VALUE! | L59:L62 | e |  |

### Row 39

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B39 | 2 | BUILDING DETAILS |  | s | B39:I39 |

### Row 40

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B40 | 2 | Particulars |  | s | B40:E40 |
| F40 | 6 | Area |  | s |  |
| G40 | 7 | Rate/Sq.ft |  | s |  |
| H40 | 8 | Amount in Rs. |  | s | H40:I40 |

### Row 41

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B41 | 2 | 2 Floor Building |  | s | B41:E41 |
| H41 | 8 | 0.00 | IF(F41>=1,F41*G41,G41) | n | H41:I41 |

### Row 42

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H42 | 8 | 0.00 | IF(F42>=1,F42*G42,G42) | n | H42:I42 |

### Row 43

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H43 | 8 | 0.00 | IF(F43>=1,F43*G43,G43) | n | H43:I43 |

### Row 44

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H44 | 8 | 0.00 | IF(F44>=1,F44*G44,G44) | n | H44:I44 |

### Row 45

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H45 | 8 | 0.00 | IF(F45>=1,F45*G45,G45) | n | H45:I45 |

### Row 46

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H46 | 8 | 0.00 | IF(F46>=1,F46*G46,G46) | n | H46:I46 |
| K46 | 11 |   |  | s |  |

### Row 47

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H47 | 8 | 0.00 | IF(F47>=1,F47*G47,G47) | n | H47:I47 |

### Row 48

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H48 | 8 | 0.00 | SUM(H41:H47) | n | H48:I48 |

### Row 52

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B52 | 2 | MACHINERY DETAILS |  | s | B52:I52 |

### Row 53

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B53 | 2 | Particulars |  | s | B53:E53 |
| F53 | 6 | Qty. |  | s |  |
| G53 | 7 | Rate |  | s |  |
| H53 | 8 | Amount in Rs. |  | s | H53:I53 |

### Row 54

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B54 | 2 | CNC |  | s | B54:E54 |
| H54 | 8 | 0.00 | IF(F54>=1,F54*G54,G54) | n | H54:I54 |

### Row 55

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H55 | 8 | 0.00 | IF(F55>=1,F55*G55,G55) | n | H55:I55 |
| L55 | 12 | Male |  | s |  |
| M55 | 13 | 1 |  | n |  |
| Q55 | 17 | 0.35 | IF(IF(AND(DataSheet!M55=1, DataSheet!M70=9, DataSheet!M64=2),15%,25%),IF(AND(DataSheet!M55=1, DataSheet!M70=9, DataSheet!M64=1),25%,35%)) | n |  |

### Row 56

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H56 | 8 | 0.00 | IF(F56>=1,F56*G56,G56) | n | H56:I56 |
| L56 | 12 | Female |  | s |  |

### Row 57

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H57 | 8 | 0.00 | IF(F57>=1,F57*G57,G57) | n | H57:I57 |
| L57 | 12 | Transgender |  | s |  |
| R57 | 18 | 35 | IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35)) | n |  |

### Row 58

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H58 | 8 | 0.00 | IF(F58>=1,F58*G58,G58) | n | H58:I58 |
| R58 | 18 | 25 | IF(AND(M55=1,M70=9,M64=2),15,25) | n |  |

### Row 59

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H59 | 8 | 0.00 | IF(F59>=1,F59*G59,G59) | n | H59:I59 |
| L59 | 12 | KVIC |  | s |  |
| M59 | 13 | 1 |  | n |  |
| R59 | 18 | 25 | IF(AND(M55=1,M64=1,M70=9),35,25) | n |  |

### Row 60

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H60 | 8 | 0.00 | IF(F60>=1,F60*G60,G60) | n | H60:I60 |
| L60 | 12 | KVIB |  | s |  |
| R60 | 18 | 0 | IF(AND(M57=1,M72=9,M66=2),15,0) | n |  |

### Row 61

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H61 | 8 | 0.00 | IF(F61>=1,F61*G61,G61) | n | H61:I61 |
| L61 | 12 | DIC |  | s |  |
| P61 | 16 | 1 |  | n |  |

### Row 62

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H62 | 8 | 0.00 | IF(F62>=1,F62*G62,G62) | n | H62:I62 |
| L62 | 12 | COIR Board |  | s |  |

### Row 63

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H63 | 8 | 0.00 | IF(F63>=1,F63*G63,G63) | n | H63:I63 |

### Row 64

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H64 | 8 | 0.00 | IF(F64>=1,F64*G64,G64) | n | H64:I64 |
| L64 | 12 | Rural |  | s |  |
| M64 | 13 | 1 |  | n |  |

### Row 65

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H65 | 8 | 0.00 | IF(F65>=1,F65*G65,G65) | n | H65:I65 |
| L65 | 12 | Urban |  | s |  |

### Row 66

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H66 | 8 | 0.00 | IF(F66>=1,F66*G66,G66) | n | H66:I66 |

### Row 67

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B67 | 2 | Total |  | s | B67:E67 |
| H67 | 8 | 0.00 | SUM(H54:H66) | n | H67:I67 |
| L67 | 12 | No |  | s |  |
| M67 | 13 | 1 |  | n |  |

### Row 68

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L68 | 12 | Yes |  | s |  |

### Row 70

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B70 | 2 | d.  Preliminary & Pre-operative Cost : |  | s | B70:E70 |
| L70 | 12 | SC |  | s |  |
| M70 | 13 | 1 |  | n |  |

### Row 71

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L71 | 12 | ST |  | s |  |

### Row 72

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B72 | 2 | e.  Furniture & Fixtures                         : |  | s | B72:E72 |
| L72 | 12 | OBC |  | s |  |

### Row 73

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L73 | 12 | PHC |  | s |  |

### Row 74

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B74 | 2 | f.   Contingency/Others/Miscellaneous                                    : |  | s | B74:E74 |
| L74 | 12 | Ex- Serviceman |  | s |  |

### Row 75

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L75 | 12 | Minority |  | s |  |

### Row 76

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B76 | 2 | Working Capital                                : |  | s | B76:E76 |
| H76 | 8 | 0.00 | SUM(H70:I74) | n | H76:I76 |
| L76 | 12 | Hill Boarder Area |  | s |  |

### Row 77

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L77 | 12 | Aspirational Districts |  | s |  |

### Row 78

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L78 | 12 | General |  | s |  |

### Row 80

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L80 | 12 | Manufacturing  |  | s |  |
| M80 | 13 | 1 |  | n |  |

### Row 81

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L81 | 12 | Service |  | s |  |

### Row 83

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B83 | 2 | Means of Financing |  | s | B83:G83 |
| L83 | 12 | Under 8th |  | s |  |
| M83 | 13 | 4 |  | n |  |

### Row 84

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L84 | 12 | 8th Pass |  | s |  |

### Row 85

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B85 | 2 | Own Contribution                                : |  | s | B85:E85 |
| G85 | 7 | 5% | IF(AND(DataSheet!M55=1, DataSheet!M70=9),10%,5%) | n |  |
| L85 | 12 | 10th Pass |  | s |  |

### Row 86

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B86 | 2 | Bank Finance                                    :  |  | s | B86:E86 |
| G86 | 7 | 95% | 100%-G85 | n |  |
| L86 | 12 | 12th Pass |  | s |  |

### Row 87

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B87 | 2 | Margin Money (Govt. Subsidy)                   : |  | s | B87:E87 |
| G87 | 7 | 35% | IF(DataSheet!M64=2,IF(AND(DataSheet!M55=1,DataSheet!M70=9),15%,25%),IF(AND(DataSheet!M55=1,DataSheet!M70=9),25%,35%)) | n |  |
| L87 | 12 | Graduate |  | s |  |

### Row 88

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L88 | 12 | Post Graduate |  | s |  |

### Row 89

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| L89 | 12 | PhD |  | s |  |

### Row 91

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B91 | 2 | DETAILS OF SALES |  | s | B91:I91 |
| L91 | 12 | Own |  | s |  |
| M91 | 13 | 2 |  | n |  |

### Row 92

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B92 | 2 | Particulars of Products |  | s | B92:E93 |
| F92 | 6 | Rate/ |  | s |  |
| G92 | 7 | Qantity |  | s |  |
| H92 | 8 | Amount in Rs. |  | s | H92:I92 |
| L92 | 12 | Rented |  | s |  |

### Row 93

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| F93 | 6 | Unit |  | s |  |
| L93 | 12 | Leased |  | s |  |

### Row 94

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H94 | 8 | 0.00 | IF(G94>=1,G94*F94,F94) | n | H94:I94 |

### Row 95

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H95 | 8 | 0.00 | IF(G95>=1,G95*F95,F95) | n | H95:I95 |

### Row 96

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H96 | 8 | 0.00 | IF(G96>=1,G96*F96,F96) | n | H96:I96 |

### Row 97

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H97 | 8 | 0.00 | IF(G97>=1,G97*F97,F97) | n | H97:I97 |

### Row 98

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H98 | 8 | 0.00 | IF(G98>=1,G98*F98,F98) | n | H98:I98 |

### Row 99

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H99 | 8 | 0.00 | IF(G99>=1,G99*F99,F99) | n | H99:I99 |

### Row 100

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H100 | 8 | 0.00 | IF(G100>=1,G100*F100,F100) | n | H100:I100 |

### Row 101

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H101 | 8 | 0.00 | IF(G101>=1,G101*F101,F101) | n | H101:I101 |

### Row 102

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B102 | 2 | Total |  | s | B102:E102 |
| H102 | 8 | 0.00 | SUM(H94:H101) | n | H102:I102 |

### Row 105

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B105 | 2 | RAW MATERIALS |  | s | B105:I105 |

### Row 106

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B106 | 2 | Particulars |  | s | B106:D106 |
| E106 | 5 | Unit |  | s |  |
| F106 | 6 | Rate/Unit |  | s |  |
| G106 | 7 | Reqd. Unit |  | s |  |
| H106 | 8 | Amount In Rs. |  | s | H106:I106 |

### Row 107

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H107 | 8 | 0.00 | IF(G107>=1,G107*F107,F107) | n | H107:I107 |

### Row 108

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H108 | 8 | 0.00 | IF(G108>=1,G108*F108,F108) | n | H108:I108 |

### Row 109

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H109 | 8 | 0.00 | IF(G109>=1,G109*F109,F109) | n | H109:I109 |

### Row 110

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H110 | 8 | 0.00 | IF(G110>=1,G110*F110,F110) | n | H110:I110 |

### Row 111

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H111 | 8 | 0.00 | IF(G111>=1,G111*F111,F111) | n | H111:I111 |

### Row 112

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H112 | 8 | 0.00 | IF(G112>=1,G112*F112,F112) | n | H112:I112 |

### Row 113

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H113 | 8 | 0.00 | IF(G113>=1,G113*F113,F113) | n | H113:I113 |

### Row 114

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H114 | 8 | 0.00 | IF(G114>=1,G114*F114,F114) | n | H114:I114 |

### Row 115

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H115 | 8 | 0.00 | IF(G115>=1,G115*F115,F115) | n | H115:I115 |

### Row 116

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B116 | 2 | Total |  | s | B116:D116 |
| H116 | 8 | 0.00 | SUM(H107:H115) | n | H116:I116 |

### Row 118

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B118 | 2 | WAGES |  | s | B118:I118 |

### Row 119

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B119 | 2 | Particulars |  | s | B119:D120 |
| E119 | 5 | No. of |  | s |  |
| F119 | 6 | Wages Per Month |  | s | F119:G119 |
| H119 | 8 | Amount in Rs. |  | s | H119:I119 |

### Row 120

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| E120 | 5 | Worker |  | s |  |
| F120 | 6 | Total Month |  | s |  |
| G120 | 7 | 12 |  | n |  |

### Row 121

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B121 | 2 | Labor |  | s | B121:D121 |
| H121 | 8 | 0.00 | E121*F121*G120 | n | H121:I121 |

### Row 122

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H122 | 8 | 0.00 | E122*F122*G120 | n | H122:I122 |

### Row 123

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H123 | 8 | 0.00 | E123*F123*G120 | n | H123:I123 |

### Row 124

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H124 | 8 | 0.00 | E124*F124*G120 | n | H124:I124 |

### Row 125

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H125 | 8 | 0.00 | E125*F125*G120 | n | H125:I125 |

### Row 126

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H126 | 8 | 0.00 | E126*F126*G120 | n | H126:I126 |

### Row 127

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H127 | 8 | 0.00 | E127*F127*G120 | n | H127:I127 |

### Row 128

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B128 | 2 | Total |  | s | B128:D128 |
| E128 | 5 | 0 | SUM(E121:E127) | n |  |
| H128 | 8 | 0.00 | SUM(H121:H127) | n | H128:I128 |

### Row 131

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B131 | 2 | SALARY DETAILS |  | s | B131:I131 |

### Row 132

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B132 | 2 | Particulars |  | s | B132:D133 |
| E132 | 5 | No. of  |  | s |  |
| F132 | 6 | Wages Per Month |  | s | F132:G132 |
| H132 | 8 | Amount in Rs. |  | s | H132:I132 |

### Row 133

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| E133 | 5 | Staff |  | s |  |
| F133 | 6 | Total Month |  | s |  |
| G133 | 7 | 12 |  | n |  |

### Row 134

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H134 | 8 | 0.00 | E134*F134*G133 | n | H134:I134 |

### Row 135

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H135 | 8 | 0.00 | E135*F135*G133 | n | H135:I135 |

### Row 136

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H136 | 8 | 0.00 | E136*F136*G133 | n | H136:I136 |

### Row 137

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H137 | 8 | 0.00 | E137*F137*G133 | n | H137:I137 |

### Row 138

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| H138 | 8 | 0.00 | E138*F138*G133 | n | H138:I138 |

### Row 139

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B139 | 2 | Total |  | s | B139:D139 |
| E139 | 5 | 0 | SUM(E134:E138) | n |  |
| H139 | 8 | 0.00 | SUM(H134:H138) | n | H139:I139 |

### Row 142

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B142 | 2 | WORKING CAPITAL ESTIMATE |  | s | B142:G142 |

### Row 143

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B143 | 2 | Element of Working Capital |  | s | B143:D143 |
| G143 | 7 | No. of Days |  | s |  |

### Row 146

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B146 | 2 | Stock in process |  | s | B146:D146 |

### Row 148

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B148 | 2 | Finished goods |  | s | B148:D148 |

### Row 150

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B150 | 2 | Receivable by |  | s | B150:D150 |

### Row 153

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B153 | 2 | POWER  ESTIMATE |  | s | B153:G153 |

### Row 154

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B154 | 2 | Power Requirement |  | s | B154:F154 |

### Row 157

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B157 | 2 | Repair and Maintanance |  | s | B157:E157 |
| G157 | 7 | Rs. |  | s |  |
| H157 | 8 | 0.00 | F157*H102 | n | H157:I157 |

### Row 159

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B159 | 2 | Power and Fuel |  | s | B159:E159 |
| G159 | 7 | Rs. |  | s |  |
| H159 | 8 | 0.00 | F159*H102 | n | H159:I159 |

### Row 161

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B161 | 2 | Other Overhead Expenses |  | s | B161:E161 |
| G161 | 7 | Rs. |  | s |  |
| H161 | 8 | 0.00 | F161*H102 | n | H161:I161 |

### Row 163

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B163 | 2 | Telephone Expenses |  | s | B163:E163 |
| G163 | 7 | Rs. |  | s |  |
| H163 | 8 | 0.00 | F163*H102 | n | H163:I163 |

### Row 165

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B165 | 2 | Stationery & Postage |  | s | B165:E165 |
| G165 | 7 | Rs. |  | s |  |
| H165 | 8 | 0.00 | F165*H102 | n | H165:I165 |

### Row 167

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B167 | 2 | Advertisement & Publicity |  | s | B167:E167 |
| G167 | 7 | Rs. |  | s |  |
| H167 | 8 | 0.00 | F167*H102 | n | H167:I167 |

### Row 169

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B169 | 2 | Building Rent |  | s | B169:E169 |
| G169 | 7 | Rs. |  | s |  |

### Row 171

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B171 | 2 | Other Miscelleneous Expenditure |  | s | B171:E171 |
| G171 | 7 | Rs. |  | s |  |
| H171 | 8 | 0.00 | F171*H102 | n | H171:I171 |

### Row 173

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B173 | 2 | Rate of Interest |  | s | B173:E173 |

### Row 175

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B175 | 2 | Depreciation |  | s | B175:E175 |

### Row 176

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B176 | 2 | On Building |  | s | B176:E176 |

### Row 177

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B177 | 2 | On Machinery |  | s | B177:E177 |

### Row 179

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B179 | 2 | Pay back period |  | s | B179:E179 |
| F179 | 6 | 5 |  | n |  |

### Row 180

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B180 | 2 | Project Implementation Period |  | s | B180:E180 |
| F180 | 6 | 2 |  | n |  |
| G180 | 7 | 12 |  | n |  |

### Row 182

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B182 | 2 | INTRODUCTION |  | s | B182:E182 |

### Row 200

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B200 | 2 | ABOUT THE PROMOTER |  | s | B200:G200 |

### Row 219

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B219 | 2 | Office Address: |  | s | B219:C219 |

### Row 220

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B220 | 2 | District: |  | s | B220:G220 |

### Row 221

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B221 | 2 | Khadi & V.I. Commission |  | s | B221:G221 |

### Row 222

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B222 | 2 | 0 |  | n | B222:G222 |

### Row 223

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B223 | 2 | 0 |  | n | B223:G223 |

### Row 224

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B224 | 2 | Taluk/Block: |  | s | B224:D224 |
| E224 | 5 | State: |  | s |  |
| F224 | 6 | 0 |  | n | F224:G224 |

### Row 227

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B227 | 2 | Name & Signature Incharge |  | s | B227:F227 |

### Row 228

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| C228 | 3 | with round seal |  | s | C228:E228 |

### Row 233

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B233 | 2 | INTRODUCTION |  | s | B233:E233 |

### Row 250

| Cell | Col | Value | Formula | Type | MergeRange |
|------|-----|-------|---------|------|------------|
| B250 | 2 | ABOUT THE BENEFICIARY |  | s | B250:G250 |
