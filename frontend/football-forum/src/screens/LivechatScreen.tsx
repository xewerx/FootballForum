import React from 'react'
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';
import * as types from '../@types/livechatTypes';

function LivechatScreen() {

    const projectID = '261ea1dc-3296-4368-84df-95f540a02a7f';
    const chatID = '41740';
    const chatAccessKey='ca-4bfae2c5-9cf9-4764-b700-ca98acac2559';
    const userName="Admin";


    return (
        <div className="livechat-container">
            <ChatEngineWrapper>
                <ChatSocket
                    projectID={projectID}
                    chatID={chatID}
                    chatAccessKey={chatAccessKey}
                    userName={userName}
                    
                    onConnect={() => console.log("CONNECT")}

                    onNewMessage={(chatId: string, message: types.messageType) => {
                        if(message.sender_username !== userName) {
                            new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play();
                        }
                        
                    }}

                />
                <ChatFeed activeChat={chatID} />
            </ChatEngineWrapper>
        </div>
    )
}

export default LivechatScreen;