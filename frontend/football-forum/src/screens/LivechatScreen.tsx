import React from 'react'
import { useSelector } from 'react-redux';

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';
import * as types from '../@types/livechatTypes';
import { History } from 'history';
import stateType from '../@types/globaStateType';

interface IProps {
    history: History
}

const LivechatScreen: React.FC<IProps> = (props) => {

    const user = useSelector((state: stateType) => state.userSignin);
    const { userInfo } = user;

    return (
        userInfo ?
            <div className="livechat-container">
                <ChatEngineWrapper>
                    <ChatSocket
                        projectID={userInfo.livechat_projectID}
                        chatID={userInfo.livechat_chatID}
                        chatAccessKey={userInfo.livechat_chatAccessKey}
                        userName={userInfo.name}

                        onConnect={() => console.log("CONNECT")}

                        onNewMessage={(chatId: string, message: types.messageType) => {
                            if (message.sender_username !== userInfo.name) {
                                new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play();
                            }

                        }}

                    />
                    <ChatFeed activeChat={userInfo.livechat_chatID} />
                </ChatEngineWrapper>
            </div>
            :
            <div>
                <p>Zaloguj sie aby korzystac z livechatu</p>
            </div>

    )
}

export default LivechatScreen;