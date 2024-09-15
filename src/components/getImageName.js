const getImageName = (folder_id, child_folder_id, id_frame, frame_mapping_index) => {
    if (folder_id < 10) {
        folder_id = `0${folder_id}`
    }
    if (child_folder_id < 10) {
        child_folder_id = `0${child_folder_id}`
    }
    return `L${folder_id}_V${child_folder_id}-${id_frame}-${frame_mapping_index}`
}


export default getImageName