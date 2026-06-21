"use client";

import { useEffect, useState } from "react";
import { Chip, Table, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Pencil, Trash2 } from "lucide-react";
import DeleteClientComment from "@/components/client/DeleteClientComment";
import UpdateClientComment from "@/components/client/UpdateClientComment";

const ClientComment = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user)

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/client?userEmail=${user.email}`,
      );

      const data = await res.json();
      setComments(data);
    };

    load();
  }, [user]);
  console.log(comments);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-2xl font-bold mb-5">My Comments</h2>

      <Table aria-label="Client comments table">
        <Table.Content className="min-w-[900px]">
          {/* HEADER */}
          <Table.Header>
            <Table.Column isRowHeader minWidth={250}>
              Lawyer
            </Table.Column>

            <Table.Column minWidth={350}>Comment</Table.Column>

            <Table.Column minWidth={180}>Date</Table.Column>

            <Table.Column minWidth={140}>Actions</Table.Column>
          </Table.Header>

          {/* BODY */}
          <Table.Body>
            {comments.map((item) => (
              <Table.Row key={item._id}>
                {/* LAWYER */}
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.lawyerImg}
                      alt="lawyer"
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <p className="font-semibold text-sm">{item.lawyerName}</p>

                      <span className="text-xs text-gray-500">
                        {item.lawyerRole || "Lawyer"}
                      </span>
                    </div>
                  </div>
                </Table.Cell>

                {/* COMMENT */}
                <Table.Cell>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.comment}
                  </p>
                </Table.Cell>

                {/* DATE */}
                <Table.Cell>
                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Table.Cell>

                {/* ACTIONS */}
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <DeleteClientComment comment={item} />

                    <UpdateClientComment comment={item} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table>
    </div>
  );
};

export default ClientComment;
