"use client";

import React, { useMemo } from "react";
import { NestedComments as DotNestedComments, CommentFieldMapping } from "dot-react-comment-lib";
import { Box, Avatar } from "@mui/material";

interface User {
  uuid: string;
  name: string;
  profile_img?: string;
}

interface BackendComment {
  uuid: string;
  parent_uuid: string | null;
  comment: string;
  user: {
    uuid: string;
    name: string;
    profile?: {
      profile_img?: {
        image_url?: string;
      };
      bio?: string;
    };
    profile_img?: string;
  };
  created_at: string | Date;
}

interface MinimalCommentsProps {
  comments: BackendComment[];
  currentUser: User;
  onAdd: (text: string, parentUuid?: string) => Promise<void>;
  onDelete?: (uuid: string) => Promise<void>;
  onEdit?: (uuid: string, text: string) => Promise<void>;
}

export default function NestedComments({
  comments,
  currentUser,
  onAdd,
  onDelete,
  onEdit,
}: MinimalCommentsProps) {
  const schema: CommentFieldMapping<BackendComment> = useMemo(
    () => ({
      idKey: "uuid",
      parentIdKey: "parent_uuid",
      contentKey: "comment",
      createdAtKey: "created_at",
      authorKey: (item) => ({
        id: item.user?.uuid || (item as any).user_uuid || "user",
        name: item.user?.name || "LinkedIn Member",
        avatarUrl:
          item.user?.profile?.profile_img?.image_url ||
          item.user?.profile_img ||
          undefined,
        role: item.user?.profile?.bio ? (item.user.profile.bio.length > 35 ? item.user.profile.bio.slice(0, 35) + '...' : item.user.profile.bio) : undefined,
      }),
    }),
    []
  );

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <DotNestedComments<BackendComment>
        comments={comments || []}
        schema={schema}
        currentUser={{
          id: currentUser.uuid,
          name: currentUser.name,
          avatarUrl: currentUser.profile_img || undefined,
        }}
        config={{
          enableNesting: true,
          showThreadLines: true,
          showAvatars: true,
          quickReactions: ['👍', '❤️', '👏', '💡', '🎉', '🚀'],
          autoFocusOnReply: true,
          avatarShape: "circle",
          enableReactions: true,
          enableEmojiPicker: true,
          collapsible: true,
          defaultExpanded: true,
          composerPosition: "top",
          indentSize: 24,
        }}
        renderers={{
          avatar: (author, comment) => (
            <Avatar
              src={author.avatarUrl || undefined}
              alt={author.name}
              sx={{
                width: comment.depth > 0 ? 32 : 38,
                height: comment.depth > 0 ? 32 : 38,
                fontSize: comment.depth > 0 ? "0.8rem" : "0.9rem",
                fontWeight: 700,
                bgcolor: "#0a66c2",
                color: "#ffffff",
                border: "2px solid #ffffff",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
                flexShrink: 0,
                cursor: "pointer",
                transition: "transform 0.15s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {author.name ? author.name[0]?.toUpperCase() : "U"}
            </Avatar>
          ),
        }}
        onSubmitComment={async ({ content, parentId }) => {
          await onAdd(content, parentId ?? undefined);
        }}
        onDeleteComment={async ({ id }) => {
          if (onDelete) {
            await onDelete(id);
          }
        }}
        onEditComment={async ({ id, content }) => {
          if (onEdit) {
            await onEdit(id, content);
          }
        }}
        styles={{
          root: {
            p: 0,
            background: "transparent",
            boxShadow: "none",
            width: "100%",
          },
          header: {
            display: "none",
          },
          composer: {
            my: 1.5,
            bgcolor: "#ffffff",
            p: 1.5,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          },
          composerInput: {
            borderRadius: 2.5,
            borderColor: "#d0d7de",
            bgcolor: "#f8f9fa",
            p: 1.25,
            fontSize: "0.875rem",
            transition: "all 0.2s ease-in-out",
            "&:focus-within": {
              borderColor: "#0a66c2",
              bgcolor: "#ffffff",
              boxShadow: "0 0 0 2px rgba(10, 102, 194, 0.15)",
            },
          },
          composerSubmitButton: {
            borderRadius: 5,
            bgcolor: "#0a66c2",
            fontWeight: 600,
            fontSize: "0.825rem",
            textTransform: "none",
            px: 2.5,
            py: 0.5,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#004182",
              boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            },
          },
          composerCancelButton: {
            borderRadius: 5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.825rem",
            color: "#666666",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.04)",
            },
          },
          commentItem: {
            my: 1,
            p: 0.5,
            borderRadius: 2,
          },
          commentHeader: {
            mb: 0.25,
            display: "flex",
            alignItems: "center",
            gap: 1,
          },
          authorName: {
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "#191919",
            cursor: "pointer",
            "&:hover": {
              color: "#0a66c2",
              textDecoration: "underline",
            },
          },
          authorBadge: {
            height: 18,
            fontSize: "0.65rem",
            fontWeight: 600,
            bgcolor: "#e8f0fe",
            color: "#0a66c2",
            borderRadius: 1,
          },
          timestamp: {
            color: "#666666",
            fontSize: "0.75rem",
          },
          commentBody: {
            fontSize: "0.875rem",
            color: "#191919",
            lineHeight: 1.5,
            bgcolor: "#f2f4f7",
            p: 1.25,
            borderRadius: "0 12px 12px 12px",
            display: "inline-block",
            minWidth: "120px",
            maxWidth: "100%",
            mt: 0.5,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          },
          actionsContainer: {
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            pl: 0.5,
          },
          replyButton: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.775rem",
            color: "#666666",
            borderRadius: 1,
            px: 1,
            py: 0.25,
            "&:hover": {
              color: "#0a66c2",
              bgcolor: "rgba(10, 102, 194, 0.08)",
            },
          },
          reactionChip: {
            height: 24,
            borderRadius: 3,
            borderColor: "#e0e0e0",
            bgcolor: "#ffffff",
            fontSize: "0.75rem",
            transition: "all 0.15s ease",
            "&:hover": {
              borderColor: "#0a66c2",
              bgcolor: "#f0f7ff",
            },
          },
          activeReactionChip: {
            borderColor: "#0a66c2",
            bgcolor: "rgba(10, 102, 194, 0.08)",
            color: "#0a66c2",
            fontWeight: 600,
          },
          addReactionButton: {
            width: 24,
            height: 24,
            borderRadius: "50%",
            borderColor: "#d0d7de",
          },
          threadLine: {
            bgcolor: "#d0d7de",
            width: "2px",
          },
          collapseButton: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.75rem",
            color: "#0a66c2",
            borderRadius: 1,
            px: 1,
            py: 0.25,
            bgcolor: "rgba(10, 102, 194, 0.06)",
            "&:hover": {
              bgcolor: "rgba(10, 102, 194, 0.12)",
            },
          },
          repliesContainer: {
            pl: "24px",
            borderLeft: "2px solid #e2e8f0",
            mt: 0.5,
          },
        }}
      />
    </Box>
  );
}
