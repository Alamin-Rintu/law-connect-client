"use client";

import React, { useState, useEffect } from "react";
import AddServices from "@/components/lawyer/AddServices";
import { Table } from "@heroui/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { DeleteLawyer } from "@/components/lawyer/DeleteLawyer";
import { UpdateLawyer } from "@/components/lawyer/UpdateLawyer";
import { authClient } from "@/lib/auth-client";

export default function LawyerProfilePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchServices = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/my-services?email=${user.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }

        const result = await res.json();

        console.log("User Email:", user.email);
        console.log("My Services:", result);

        // Backend already filters by email
        setServices(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user?.email]);

  const handleAddNewService = (newService) => {
    setServices((prev) => [...prev, newService]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Legal Services
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage your legal services
          </p>
        </div>

        <AddServices onServiceAdd={handleAddNewService} />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No services found. Add your first service!
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Lawyer Services Table"
                  className="min-w-[700px]"
                >
                  <Table.Header>
                    <Table.Column>Image</Table.Column>
                    <Table.Column isRowHeader>Name</Table.Column>
                    <Table.Column>Specialization</Table.Column>
                    <Table.Column>Fee</Table.Column>
                    <Table.Column>Actions</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {services.map((service) => (
                      <Table.Row key={service._id}>
                        <Table.Cell>
                          <Image
                            src={service.image}
                            alt={service.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover w-14 h-14 sm:w-16 sm:h-16"
                          />
                        </Table.Cell>

                        <Table.Cell>
                          <p className="font-medium text-sm sm:text-base">
                            {service.name}
                          </p>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-gray-600">
                            {service.specialization}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-semibold">
                            ${service.fee}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex gap-2">
                            <UpdateLawyer service={service} />
                            <DeleteLawyer service={service} />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}