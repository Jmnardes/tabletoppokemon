import React, { useState } from "react";
import { Box, Heading, VStack, Select, Text, Button } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import Element from "@components/Elements/Element";
import { elementCounts, tierResults } from "@utils/groups";

const transformTierData = (tierData) => {
    return tierData.map((item) => {
        const [element, count] = item.split(": ");
        return { element, count: parseInt(count, 10) };
    });
};

const CustomTick = ({ x, y, payload }) => {
    return (
        <foreignObject x={x - 25} y={y} width={50} height={50}>
            <Element element={payload.value} elementTable={false} />
            <Text>{payload.value}</Text>
        </foreignObject>
    );
};

export default function StatisticsPage({ setStatistics }) {
    const [selectedView, setSelectedView] = useState("elements");

    return (
        <Box p={5}>
            <Box>
                <Button mb={8} onClick={() => setStatistics(false)}>Voltar</Button>
            </Box>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Select
                        value={selectedView}
                        onChange={(e) => setSelectedView(e.target.value)}
                        maxW="300px"
                    >
                        <option value="elements">Element Counts</option>
                        {Object.keys(tierResults).map((tier) => (
                            <option key={tier} value={tier}>
                                Tier {tier}
                            </option>
                        ))}
                    </Select>
                </Box>

                {selectedView === "elements" ? (
                    <Box>
                        <Heading size="md" mb={4}>
                            Element Counts
                        </Heading>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={elementCounts}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="element"
                                    interval={0} 
                                    height={70} 
                                    tick={<CustomTick />}
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8">
                                    <LabelList dataKey="count" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                ) : (
                    <Box>
                        <Heading size="md" mb={4}>
                            Tier {selectedView} Element Counts
                        </Heading>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={transformTierData(tierResults[selectedView])}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="element"
                                    interval={0} 
                                    height={70} 
                                    tick={<CustomTick />} 
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d">
                                    <LabelList dataKey="count" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}