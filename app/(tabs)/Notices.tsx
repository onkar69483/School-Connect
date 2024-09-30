import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    Button,
} from "react-native";
import axios from "axios"; // Import axios for API calls
import DatePicker from "react-native-date-picker";

import { LinearGradient } from "expo-linear-gradient";

interface Notice {
    _id: string;
    title: string;
    notice: string;
    date: string;
    time: string;
    user: string; // Assuming user is just a string (can be adjusted based on actual data)
}

const Notices: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentNoticeId, setCurrentNoticeId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    // Fetch notices from the backend API when the component mounts
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/notice"
                ); // Update with your actual backend URL
                setNotices(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);
    const handleDelete = async (noticeId) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/notice/${noticeId}`
            );

            if (response.status === 200) {
                // Filter out the deleted notice from the state
                setNotices(notices.filter((notice) => notice._id !== noticeId));
                alert("Notice deleted successfully.");
            } else {
                alert("Failed to delete notice.");
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
            alert("An error occurred while deleting the notice.");
        }
    };

    const handleEditClick = (notice) => {
        setNewTitle(notice.title); // Set the existing title in the modal
        setNewNotice(notice.notice); // Set the existing notice in the modal
        setDate(new Date(notice.date)); // Set the existing date
        setCurrentNoticeId(notice._id); // Store the ID of the notice being edited
        setEditMode(true); // Switch to edit mode
        setModalVisible(true); // Open the modal
    };

    const handleEdit = async () => {
        if (newTitle && newNotice) {
            const updatedNotice = {
                title: newTitle,
                notice: newNotice,
                // use date and time from datepicker
                date: "2024-10-25T00:00:00.000Z", // Replace with actual date from picker
                time: "25:00 PM", // Replace with actual time
                user: "66de790a1f34eeb2296addaa", // Replace with actual user ID
            };

            try {
                const response = await fetch(
                    `http://localhost:8000/api/notice/${currentNoticeId}`,
                    {
                        method: "PUT", // PUT for update
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedNotice),
                    }
                );

                if (response.ok) {
                    const updatedData = await response.json();

                    // Update the notice in the state
                    setNotices(
                        notices.map((notice) =>
                            notice._id === currentNoticeId
                                ? updatedData
                                : notice
                        )
                    );

                    setNewTitle("");
                    setNewNotice("");
                    setModalVisible(false);
                    setEditMode(false);
                    alert("Notice updated successfully.");
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (err) {
                console.error("Error updating notice:", err);
                alert("An error occurred while updating the notice.");
            }
        } else {
            alert("Please fill in both the title and content.");
        }
    };

    const handleAddNotice = async () => {
        if (newTitle && newNotice) {
            const newNoticeItem = {
                title: newTitle,
                notice: newNotice,
                // use date and time from datepicker
                date: "2024-10-25T00:00:00.000Z",
                time: "25:00 PM",
                user: "66de790a1f34eeb2296addaa", // Replace with actual user ID
            };

            try {
                console.log(newNoticeItem);

                const response = await fetch(
                    "http://localhost:8000/api/notice",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newNoticeItem),
                    }
                );

                if (response.ok) {
                    const savedNotice = await response.json();
                    // Add the new notice to your state (notices)
                    setNotices([...notices, savedNotice]);
                    setNewTitle("");
                    setNewNotice("");
                    setModalVisible(false);
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (err) {
                console.error("Error posting notice:", err);
                alert("An error occurred while adding the notice.");
            }
        } else {
            alert("Please fill in both the title and content.");
        }
    };

    return (
        <LinearGradient
            colors={["#1c1c1c", "#1c1c1c"]} // Solid dark background
            style={styles.container}
        >
            <Text style={styles.header}>Notice Board</Text>
            <FlatList
                data={notices}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <>
                        <View style={styles.noticeItem}>
                            <View style={styles.noticeContentContainer}>
                                <Text style={styles.noticeTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.noticeContent}>
                                    {item.notice}
                                </Text>
                                <Text style={styles.eventDateTime}>
                                    Date:{" "}
                                    {new Date(item.date)
                                        .toLocaleString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                        })
                                        .replace(
                                            /(\d+)(?=\s)/,
                                            (d) =>
                                                `${parseInt(d, 10)}${
                                                    ["th", "st", "nd", "rd"][
                                                        ((parseInt(d, 10) %
                                                            10) -
                                                            1 +
                                                            30) %
                                                            10
                                                    ] || "th"
                                                }`
                                        )}
                                    {"\n"}
                                    Time: {item.time}{" "}
                                </Text>
                            </View>
                            <View style={styles.noticeDateContainer}>
                                <Text style={styles.noticeDate}>
                                    {
                                        new Date(item.createdAt)
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </Text>
                                <Text style={styles.noticeTime}>
                                    {new Date(
                                        item.updatedAt
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </Text>
                                <View style={styles.noticeButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => handleEditClick(item)}
                                    >
                                        <Text style={styles.buttonText}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDelete(item._id)}
                                    >
                                        <Text style={styles.noticeButtonText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Button Container */}
                        </View>
                    </>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Add Notice"
                    onPress={() => setModalVisible(true)}
                    color="#007BFF"
                />{" "}
                {/* Blue button */}
            </View>

            {/* Modal for Adding New Notice */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Notice</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#aaa"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Content"
                            placeholderTextColor="#aaa"
                            value={newNotice}
                            onChangeText={setNewNotice}
                            multiline={true}
                            numberOfLines={4}
                        />
                        {/* <>
                            <Button
                                title="Select date-time"
                                onPress={() => setOpen(true)}
                            />
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                theme="light"
                                onConfirm={(date) => {
                                    setOpen(false);
                                    setDate(date);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                        </> */}
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.submitButton,
                                ]}
                                onPress={
                                    editMode ? handleEdit : handleAddNotice
                                }
                            >
                                <Text style={styles.buttonText}>
                                    {editMode ? "Update" : "Submit"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                ]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setEditMode(false);
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#000000",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#FFFFFF",
    },
    noticeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 8,
        backgroundColor: "#2b2b2b",
    },
    noticeContentContainer: {
        flex: 1,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    noticeContent: {
        fontSize: 14,
        color: "#CCCCCC",
        marginTop: 8,
    },
    noticeDateContainer: {
        alignItems: "flex-end",
    },
    noticeDate: {
        fontSize: 12,
        color: "#AAAAAA",
    },
    noticeTime: {
        fontSize: 12,
        color: "#AAAAAA",
    },
    eventDateTime: {
        paddingTop: 8,
        color: "#AAAAAA",
    },
    buttonContainer: {
        marginTop: 16,
        backgroundColor: "#000000",
        borderRadius: 8,
        overflow: "hidden",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#333333",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        backgroundColor: "#444444",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#007BFF",
    },
    cancelButton: {
        backgroundColor: "#444444",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    noticeButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#4CAF50", // Green color for Edit
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#F44336", // Red color for Delete
        padding: 10,
        borderRadius: 5,
    },
    noticeButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default Notices;
