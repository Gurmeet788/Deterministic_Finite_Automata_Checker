# DFA Simulator

This project implements the simulation of a **Deterministic Finite Automaton (DFA)** in Java. The DFA is defined completely by the user as input — including states, alphabet, transitions, initial and final states — and the program simulates string acceptance based on that DFA.

---

## 📝 Assignment Description

> Implement the simulation of DFA in any language. And compute string of any language corresponding to the given DFA.  
>
> **Assumptions**:  
> The user has designed a DFA on paper and now wants to simulate it by entering:
>
> - Number of alphabets = `n`
> - Number of states = `m`
> - Initial state (as integer)
> - List of final states (as integers)
> - Transition Table (2D array of size `m x n`)
> - Input string `w`
>
> The program should:
> 1. Initialize the current state with the initial state
> 2. For each character in input string:
>    - Look up transition: `currentState = Transition[currentState][wi]`
> 3. After processing the input:
>    - If `currentState` is in final states → **Accept**
>    - Else → **Reject**
---
## ✅ Features

- Works for any DFA built with integers as states name (but you can image strig or char name as integers like q0 as 0 q1 as 1...)

- Supports binary and character alphabets (0/1 or a/b)

- Can define multiple final states

- Reports clearly whether a string is accepted or rejected

---

## 👨‍💻 Language Used

- Java

---

## 📥 How to Run

1. Make sure you have Java installed.
2. Compile and run:

- bash

1. javac DFA.java
2. java DFA

```Console Prompts

Follow the console prompts:

- Enter alphabet size (Σ) (e.g., 2 for `0,1` or `a,b`)
- Enter number of states (Q) (e.g., 3)
- Enter initial state (q0) (e.g., 0)
- How many final (f) do you have? (e.g, 1)
- Enter 1 final (f) state: (e.g, 3)
- Enter transitions for all states and inputs
- Enter input type (`0` for `0,1` or `1` for `a,b`)
- Enter the input string

---

## 📊 Example Test Case

🎯 **DFA to accept strings ending in `01`**
- **Alphabet**: `0, 1`

### 🧪 Input
Number of Alphabets: 2
Number of States: 3
Initial State: 0
Final States: 2

Transition Table:
0 0 -> 1
0 1 -> 0
1 0 -> 1
1 1 -> 2
2 0 -> 1
2 1 -> 0

Input Type: 0
Input String: 1001
🔁 Output
String Accepted
```
---
# 📁 Files
- DFA.java – Main Java program
- README.md – Project documentation
---
# 🏫 University
- DHA Suffa University
---
# 🙋‍♂️ Author
- [gurmeet788](https://github.com/gurmeet788)

