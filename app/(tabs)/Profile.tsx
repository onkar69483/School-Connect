import React from "react";

import AvatarNameRole from "@/components/AvatarNameRole";
import EditableText from "@/components/EditableText";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading, TrashIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";

export default function Profile() {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const handleClose = () => setShowAlertDialog(false);
    return (
        // FallBackText = name of the user
        <>
            <VStack>
                <AvatarNameRole
                    role="teacher"
                    userName="eigansdji"
                    photo="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                />
                <EditableText placeholder={"Name"} />
                <EditableText placeholder={"Contact 1"} />
                <EditableText placeholder={"Contact 2"} />

                <>
                    <Button onPress={() => setShowAlertDialog(true)}>
                        <ButtonText>Delete Invoice</ButtonText>
                    </Button>
                    <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
                        <AlertDialogBackdrop />
                        <AlertDialogContent className="w-full max-w-[415px] gap-4 items-center">
                            <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                                <Icon
                                    as={TrashIcon}
                                    size="lg"
                                    className="stroke-error-500"
                                />
                            </Box>
                            <VStack className="items-center">
                                <AlertDialogHeader className="mb-2">
                                    <Heading size="md">Delete account?</Heading>
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    <Text size="sm" className="text-center">
                                        The invoice will be deleted from the
                                        invoices section and in the documents
                                        folder. This cannot be undone.
                                    </Text>
                                </AlertDialogBody>
                                <AlertDialogFooter className="mt-5">
                                    <Button
                                        size="sm"
                                        action="negative"
                                        onPress={handleClose}
                                        className="px-[30px]"
                                    >
                                        <ButtonText>Delete</ButtonText>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        action="secondary"
                                        onPress={handleClose}
                                        size="sm"
                                        className="px-[30px]"
                                    >
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                </AlertDialogFooter>
                            </VStack>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            </VStack>
        </>
    );
}
