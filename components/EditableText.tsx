import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon } from "./ui/button";
import { EditIcon } from "lucide-react-native";
import { Input, InputField, InputSlot } from "./ui/input";

export default function EditableText({ placeholder }: {placeholder: string}) {
    return (
        <HStack>
            <Input>
                <InputField placeholder={placeholder} />
                <InputSlot></InputSlot>
            </Input>

            <Button size="lg" className="rounded-full p-3.5">
                {/* EditIcon is imported from 'lucide-react-native' */}
                <ButtonIcon as={EditIcon} />
            </Button>
        </HStack>
    );
}
