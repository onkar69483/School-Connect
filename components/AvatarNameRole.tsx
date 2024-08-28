import React from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarNameRole({
    userName,
    role,
    photo,
}: {
    userName: string;
    role: string;
    photo: string;
}) {
    return (
        <HStack space="md">
            <Avatar>
                <AvatarFallbackText>{userName}</AvatarFallbackText>
                <AvatarImage
                    source={{
                        uri: photo,
                    }}
                />
            </Avatar>
            <VStack>
                <Heading size="sm">{userName}</Heading>
                <Text size="sm">{role}</Text>
            </VStack>
        </HStack>
    );
}
