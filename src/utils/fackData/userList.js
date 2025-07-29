const list = [
    {
        id: 1,
        user_img: "/images/avatar/2.png",
        user_name: "Archie Cantones",
        user_email: "arcie.tones@gmail.com",
        user_status: "Completed",
        proposal: "Sent",
        date: "11/06/2023 10:53",
        is_active: {
            position: "active",
            color: "#17c666"
        },
        active_time: "2 min ago",
        is_message_read: false,
        color:"success"
    },
]

export const userList = (startItem = 0, endItem = list.length) => {
    return list.slice(startItem, endItem)
}