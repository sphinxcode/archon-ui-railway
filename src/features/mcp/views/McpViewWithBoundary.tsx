import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FeatureErrorBoundary } from "../../ui/components";
import { McpView } from "./McpView";
import { RailwayMcpView } from "./RailwayMcpView";

export const McpViewWithBoundary = () => {
  // Check if we're on Railway deployment
  const isRailway = window.location.hostname.includes('railway.app');
  
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <FeatureErrorBoundary featureName="MCP Dashboard" onReset={reset}>
          {isRailway ? <RailwayMcpView /> : <McpView />}
        </FeatureErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};