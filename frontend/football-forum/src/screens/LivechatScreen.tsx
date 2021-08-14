import React from 'react'
import { useSelector } from 'react-redux';

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';
import * as types from '../@types/livechatTypes';
import { History } from 'history';
import stateType from '../@types/globaStateType';
import MessageBox from '../components/MessageBox/MessageBox';

interface IProps {
    history: History
}

const LivechatScreen: React.FC<IProps> = (props) => {

    const user = useSelector((state: stateType) => state.userSignin);
    const { userInfo } = user;

    return (
        userInfo ?
            userInfo.livechat_credentials ?
                <div className="livechat-container screen-container">
                    <div className="caption">
                        <h2>Live chat</h2>
                    </div>
                    <ChatEngineWrapper>
                        <ChatSocket
                            projectID={userInfo.livechat_credentials!.livechat_projectID}
                            chatID={userInfo.livechat_credentials!.livechat_chatID}
                            chatAccessKey={userInfo.livechat_credentials!.livechat_chatAccessKey}
                            userName={userInfo.name}
                            
                            onConnect={() => console.log("CONNECT")}

                            onNewMessage={(chatId: string, message: types.messageType) => {
                                if (message.sender_username !== userInfo.name) {
                                    new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play();
                                }

                            }}

                        />
                        <ChatFeed activeChat={userInfo.livechat_credentials!.livechat_chatID} />
                    </ChatEngineWrapper>
                </div>
                :
                <div className="screen-container">
                    <div className="caption">
                        <h2>Live chat</h2>
                    </div>
                    <MessageBox variant="danger">Coś poszło nie tak :/, zaloguj się ponownie</MessageBox>
                </div>
            :
            <div className="screen-container">
                <div className="caption">
                    <h2>Live chat</h2>
                </div>
                <MessageBox variant="danger">Zaloguj się aby korzystać z czatu</MessageBox>
            </div>

    )
}

export default LivechatScreen;