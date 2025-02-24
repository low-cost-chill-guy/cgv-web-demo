// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/* eslint-disable */

// Amazon IVS Playback URL
// Replace this with your own Amazon IVS Playback URL
export let PLAYBACK_URL = "";

// Chat websocket address
// The AWS region that your room is created in. For example, `us-west-2`.
export let CHAT_REGION = "";

// Chat API URL
// The Amazon IVS Chat backend endpoint. You must deploy the serverless backend to get this value.
export let API_URL = "https://013124okng.execute-api.ap-northeast-2.amazonaws.com/Prod";

// Chat room id (ARN)
export let CHAT_ROOM_ID = "";

export const updateStreamingConstants = (config) => {
  PLAYBACK_URL = config.playbackUrl;
  CHAT_REGION = config.chatRegion;
  API_URL = "https://013124okng.execute-api.ap-northeast-2.amazonaws.com/Prod";
  CHAT_ROOM_ID = config.chatRoomArn;
};