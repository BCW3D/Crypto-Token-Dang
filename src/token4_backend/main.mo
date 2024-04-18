import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";

actor token4 {
    var owner : Principal = Principal.fromText("7izpp-o2xqv-ihg2a-e6odx-7xpzo-gd5sg-inu3i-l4g7x-gvenc-r4ixo-qqe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DANG";


    private stable var balanceEntries : [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if(balances.size() < 1){
     balances.put(owner, totalSupply);
    };

    

    public func balanceOf(who : Principal) : async Nat{
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func currency () : async Text{
        return symbol;
    };


    public shared(msg) func payOut() : async Text{
      
        let amount : Nat = 10000;
        if(balances.get(msg.caller) == null){
            let result = await transfer(msg.caller, amount);
            
            return result;
        } else {
            return "You've used the faucet";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) :  async Text{
        let fromAccount : Nat = await balanceOf(msg.caller);

        if(fromAccount > amount){
            let fromNewBalance : Nat = fromAccount - amount;
            balances.put(msg.caller, fromNewBalance);

            let toBalance : Nat = await balanceOf(to);
            let toNewBalance : Nat = toBalance + amount;

            balances.put(to, toNewBalance);

            return "success";
        }else{
            return "Insufficient Balance";
        }
    };


    system func preupgrade(){

        balanceEntries := Iter.toArray(balances.entries());

    };

    system func postupgrade(){

        balances:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        if(balances.size() < 1){
            balances.put(owner, totalSupply);
        };

        Debug.print(debug_show(balances.size()));
    }



    
}