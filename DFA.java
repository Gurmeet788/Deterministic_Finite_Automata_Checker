import java.util.Scanner;

public class DFA {

    static int numberOfAlph;
    static int numberOfSat;
    static int initialSat;
    static String stringW;
    static int finalSat[];
    static int TranTable[][];

    public static void createTable(Scanner sc){

        TranTable = new int[numberOfSat][numberOfAlph];

        for(int i = 0; i < numberOfSat; i++){
            for(int j = 0; j < numberOfAlph; j++){

                System.out.println("Enter the Transtion of " + i + " State with " + j + " Alpbhabt");
                int state = 0;
                state = sc.nextInt();
                TranTable[i][j] = state;
            }
        }
    }


    public static int match(int array[][], int value, int currentState){
        currentState = array[currentState][value];
        return currentState;
    }


    public static int takeinput(){
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the Number of Alphbat (Σ):");
        numberOfAlph = sc.nextInt();

        System.out.println("Enter the number of State (Q):");
        numberOfSat = sc.nextInt();

        System.out.println("Enter the Initial State (q0):");
        initialSat = sc.nextInt();

        System.out.println("How many final State (f) do you have?");
        int finalNum = sc.nextInt();
        finalSat = new int[finalNum];

        for(int j = 0; j < finalNum; j++){
            System.out.print("Enter your " + (j + 1) + " final State:");
            int sat = sc.nextInt();
            finalSat[j] = sat;
        }

        createTable(sc);

        System.out.print("Your input String is (0,1) from Type 0 or (a,b) from Type other 0:");
        int inputType = sc.nextInt();

        sc.nextLine();
        
        System.out.println("Enter the input which you want to check (w):");
        stringW = sc.nextLine();

        char[] input = stringW.toCharArray();

        int currentState = initialSat;

        for (char ch : input) {

            int index = (inputType == 0) ? ch - '0' : ch - 'a';

            if (index < 0 || index >= numberOfAlph) {
                System.out.println("Invalid character in input: " + ch);
                return -1;
            }

            currentState = match(TranTable, index, currentState);
        }

        return currentState;
    }


    public static void main(String[] args) {

        int currentState = takeinput();

        boolean accepted = false;

        for (int state : finalSat) {

            if (currentState == state) {
                accepted = true;
                break;
            }
        }

        System.out.println(accepted ? "String Accepted" : "String Rejected");
    }
}
