import { useNavigate } from "react-router-dom";
import {
  AssetUnlockedEvent,
  AvatarCreator,
  AvatarExportedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
} from "@readyplayerme/react-avatar-creator";

import { useAvatarStore } from "shared/stores/useAvatarStore";

export default function CreatePlayerAvatar() {
  const navigate = useNavigate();
  const { setAvatar } = useAvatarStore();

  const handleOnUserSet = (event: UserSetEvent) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(`Avatar URL is: ${event.data.url}`);
    setAvatar(event.data.url);
    navigate("/");
  };

  const handleUserAuthorized = (event: UserAuthorizedEvent) => {
    console.log(`User is:`, event.data);
  };

  const handleAssetUnlocked = (event: AssetUnlockedEvent) => {
    console.log(`Asset unlocked is: ${event.data.assetId}`);
  };

  return (
    <AvatarCreator
      subdomain="wslib"
      config={{
        clearCache: true,
        bodyType: "fullbody",
        quickStart: false,
        language: "en",
      }}
      style={{ width: "100%", height: "100vh", border: "none", margin: 0 }}
      onAvatarExported={handleOnAvatarExported}
      onUserAuthorized={handleUserAuthorized}
      onAssetUnlock={handleAssetUnlocked}
      onUserSet={handleOnUserSet}
    />
  );
}
