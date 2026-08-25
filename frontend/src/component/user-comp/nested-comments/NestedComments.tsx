"use client";

import React, { useMemo } from "react";
import { NestedComments as DotNestedComments, CommentFieldMapping } from "dot-react-comment-lib";
import { Box } from "@mui/material";

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
        id: item.user?.uuid || "",
        name: item.user?.name || "User",
        avatarUrl:
          item.user?.profile?.profile_img?.image_url ||
          item.user?.profile_img ||
          undefined,
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
          avatarShape: "circle",
          enableReactions: true,
          enableEmojiPicker: true,
          collapsible: true,
          defaultExpanded: true,
          composerPosition: "top",
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
          },
          header: {
            display: "none",
          },
          composer: {
            my: 1.5,
          },
          commentItem: {
            p: 1,
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
}
