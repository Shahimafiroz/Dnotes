import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
actor Dkeeper{

  // Creat part of motoko backend

      type Note = {
      title : Text;
      content: Text;
     };
      stable var notes : List.List<Note> = List.nil<Note>();
      public func createNote( titleText:Text , contentText: Text){
        let newNote: Note = {
          title = titleText;
          content = contentText;
        };
      notes := List.push(newNote , notes);
      // Debug.print(debug_show(notes));
      };

// read part of motoko backend
      
    public query func readNotes() : async [Note]{
        return List.toArray(notes);
      };

//delete part  ( there is no such methood as delete hence we are making a methood using take , drop and append)
//remember:- The issue is the space between the colon and equal sign (:=) in the line where the notes variable is updated. The correct syntax is without the space,
  
  public func deleteNote(id:Nat) {
     
        let ntsStart = List.take(notes , id);
        let ntsEnd = List.drop(notes ,  id+1 );
        notes := List.append(ntsStart , ntsEnd);
        // Debug.print("testetetetetetetet")
        


         }




}