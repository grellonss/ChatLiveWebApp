import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participans:{ $all: [senderId,receiverId]},
        });

        if(!conversation){
            conversation= await Conversation.create({
                participans: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO FUNCTIONALITY HERE

        /* await conversation.save();
        await newMessage.save(); */

        //esegue entrambe le linee di codice in parallelo ed è più veloce
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    }catch(error){
        console.log("Errore del controller sul sendMessage\n", error.message);
        res.status(500).json({error:"Errore del server interno"});
    }
};
export const getMessages = async (req,res) => {
    try{
        const {id:userToChatId}= req.params;
        const senderId=req.user._id;
        
        const conversation= await Conversation.findOne({
            participans: {$all:[senderId,userToChatId]},
        }).populate("messages");//con populate ritorniamo il messaggio intero per ogni messaggio fra i due user, non soltanto il riferimento
        
        if(!conversation) return res.status(200).json([]);
        
        const messages= conversation.messages;
        
        res.status(200).json(messages);
    }catch(error){
        console.log("Errore del controller sul sendMessage\n", error.message);
        res.status(500).json({error:"Errore del server interno"});
    }
}