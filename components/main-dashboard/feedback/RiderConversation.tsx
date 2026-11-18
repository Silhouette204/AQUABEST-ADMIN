import { Avatar } from "./Avatar";
import { firstName, type Conversation } from "./feedback";

interface Props {
  conversation: Conversation | undefined;
  onReply: (conversationId: string) => void;
}

export function RiderConversation({ conversation, onReply }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Rider conversation</h2>

      {!conversation ? (
        <p className="mt-4 text-sm text-secondary/60">No rider messages yet.</p>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-3">
            <Avatar name={conversation.name} />
            <div>
              <p className="text-sm font-semibold">{conversation.name}</p>
              <p className="text-xs text-secondary/60">Today · {conversation.time}</p>
            </div>
          </div>

          <p className="mt-4 text-sm">“{conversation.preview}”</p>

          <button
            type="button"
            onClick={() => onReply(conversation.id)}
            className="mt-4 text-sm font-medium text-tertiary"
          >
            Reply to {firstName(conversation.name)} →
          </button>
        </>
      )}
    </div>
  );
}