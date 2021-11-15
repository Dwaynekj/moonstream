import React from "react";
import { usePresignedURL } from "../core/hooks";
import Report from "./Report";
import { Spinner, Flex, Heading, Text } from "@chakra-ui/react";
import { v4 } from "uuid";

const HOUR_KEY = "Hourly";
const DAY_KEY = "Daily";
const WEEK_KEY = "Weekly";
let timeMap = {};
timeMap[HOUR_KEY] = "hour";
timeMap[DAY_KEY] = "day";
timeMap[WEEK_KEY] = "week";

const SubscriptionReport = ({ url, id, type }) => {
  const { data, isLoading } = usePresignedURL({
    url: url,
    isEnabled: true,
    id: id,
    type: type,
  });

  const plotMinW = "500px";
  if (!data || isLoading) return <Spinner />;
  return (
    <Flex w="100%" h="auto" flexGrow={1} flexBasis="420px" direction="column">
      {data?.events && Object.keys(data?.events) && (
        <Flex
          w="100%"
          h="auto"
          flexGrow={1}
          flexBasis="420px"
          direction="column"
        >
          <Heading size="sm">Events</Heading>
          {Object.keys(data.events).map((key) => {
            return (
              <Flex
                key={v4()}
                flexBasis={plotMinW}
                flexGrow={1}
                minW={plotMinW}
                minH="320px"
                maxH="420px"
                direction="column"
                boxShadow="md"
                m={2}
              >
                <Text
                  w="100%"
                  py={2}
                  bgColor="gray.50"
                  fontWeight="600"
                  textAlign="center"
                >
                  {key}
                </Text>
                <Report data={data.events[key]} metric={key} />
              </Flex>
            );
          })}
        </Flex>
      )}
      {data?.functions && Object.keys(data?.functions) && (
        <Flex
          w="100%"
          h="auto"
          flexGrow={1}
          flexBasis="420px"
          direction="column"
        >
          <Heading size="sm">functions</Heading>
          {Object.keys(data.functions).map((key) => {
            return (
              <Flex
                key={v4()}
                flexBasis={plotMinW}
                flexGrow={1}
                minW={plotMinW}
                minH="320px"
                maxH="420px"
                direction="column"
                boxShadow="md"
                m={2}
              >
                <Text
                  w="100%"
                  py={2}
                  bgColor="gray.50"
                  fontWeight="600"
                  textAlign="center"
                >
                  {key}
                </Text>
                <Report data={data.functions[key]} metric={key} />
              </Flex>
            );
          })}
        </Flex>
      )}
      {data?.generic && Object.keys(data?.generic) && (
        <Flex
          w="100%"
          h="auto"
          flexGrow={1}
          flexBasis="420px"
          direction="column"
        >
          <Heading size="sm">Account generic</Heading>
          {Object.keys(data.generic).map((key) => {
            return (
              <Flex
                key={v4()}
                flexBasis={plotMinW}
                flexGrow={1}
                minW={plotMinW}
                minH="320px"
                maxH="420px"
                direction="column"
                boxShadow="md"
                m={2}
              >
                <Text
                  w="100%"
                  py={2}
                  bgColor="gray.50"
                  fontWeight="600"
                  textAlign="center"
                >
                  {key}
                </Text>
                <Report data={data.generic[key]} metric={key} />
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default SubscriptionReport;