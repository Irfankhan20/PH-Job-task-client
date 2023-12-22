import { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { AuthContext } from "../Provider/AuthProvider";


const AllTask = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    console.log(selectedUserId)
    const { user } = useContext(AuthContext);
    const [allTask, setAllTask] = useState([])
    console.log(allTask)

    const data = allTask.filter((data) => data._id === selectedUserId)
    console.log(data)

    useEffect(() => {
        const url = `http://localhost:5000/usertasks?email=${user?.email}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllTask(data)
            })
    }, []);

    const handleDeleteItem = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/usertasks/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = allTask.filter((item) => item._id !== id);
                            setAllTask(remaining)
                        }
                    })


            }
        });
    };



    return (
        <div>
            <h1 className="text-center my-12 uppercase font-bold text-3xl lg:5xl"> See Previous Task</h1>
            <div className="overflow-x-auto shadow-2xl rounded-lg  ">
            <div className='flex justify-between items-center bg-[#adffff] py-6 px-4'>
                    <div>
                        My Previous Tasks : {allTask?.length}
                    </div>
                    

                </div>
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                Serial No
                            </th>
                            <th>Title</th>
                            <th>Deadlines</th>
                            <th>Priority</th>
                            <th>Creator's email</th>
                            <th>Creator's Name</th>
                            <th>Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="">


                        {
                            allTask.length && allTask.map((item, index) => (
                                <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.date}

                                    </td>
                                    <td>
                                        {item.priority}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.name}

                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    document.getElementById('my_modal_3').showModal();
                                                    setSelectedUserId(item._id);
                                                }}
                                                className="btn btn-outline btn-warning"
                                            >Details</button>
                                            <dialog id="my_modal_3" className="modal">
                                                <div className="modal-box">

                                                    <div className="flex justify-end">
                                                        <button onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-warning">Close</button>
                                                    </div>
                                                    {
                                                        data.map((i) => (
                                                            <div key={i._id} className="text-start">
                                                                <div className="text-center text-xl uppercase font-semibold mb-5">{i.title}</div>
                                                                <div className="flex justify-between mb-3">
                                                                    <div><span className="font-semibold">Creator Name:</span> {i.name}</div>
                                                                    <div><span className="font-semibold">Creator Email: </span>{i.email}</div>
                                                                </div>
                                                                <div className="flex justify-between mb-3">
                                                                    <div><span className="font-semibold">Create Time: </span>{i.time}</div>
                                                                    <div className="text-red-600"><span className="font-semibold"> Deadlines: </span>{i.date}</div>
                                                                </div>
                                                                <div className="font-bold text-green-600 mb-2">Priority: {i.priority}</div>
                                                                <div> <span className="font-bold">Description: </span> {i.notes}</div>


                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </dialog>
                                        </div>
                                    </td>

                                    <td>
                                        <NavLink to={`update/${item._id}`}><button className="btn  btn-warning"><GiNotebook className="w-6 h-6 " /></button> </NavLink>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item?._id)} className="btn btn-outline btn-error"><MdDelete className="w-6 h-6 " /></button>
                                    </td>
                                    <td>
                                        {item.price}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AllTask;