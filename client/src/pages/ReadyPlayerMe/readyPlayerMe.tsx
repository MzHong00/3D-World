import {
  AssetUnlockedEvent,
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
} from "@readyplayerme/react-avatar-creator";
import { useNavigate } from "react-router-dom";
import { useAvatarStore } from "stores/useStore";

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none", margin: 0 };

export default function ReadyPlayerMe() {
  const navigate = useNavigate();
  const { setAvatar } = useAvatarStore((state) => state);

  const handleOnUserSet = (event: UserSetEvent) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(`Avatar URL is: ${event.data.url}`);
    setAvatar(event.data.url);
    navigate('/')
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
      config={config}
      style={style}
      onAvatarExported={handleOnAvatarExported}
      onUserAuthorized={handleUserAuthorized}
      onAssetUnlock={handleAssetUnlocked}
      onUserSet={handleOnUserSet}
    />
  );
}