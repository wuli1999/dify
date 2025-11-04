import { type Node, type ValueSelector, type Var } from '@/app/components/workflow/types'
import { useWorkflow } from '@/app/components/workflow/hooks'
import useAvailableVarList from "./use-available-var-list";

type Params = {
    onlyLeafNodeVar?: boolean
    hideEnv?: boolean
    hideChatVar?: boolean
    filterVar: (payload: Var, selector: ValueSelector) => boolean
    passedInAvailableNodes?: Node[]
}

const useAvailableEchoVarList = (nodeId: string, {
    onlyLeafNodeVar,
    filterVar,
    hideEnv,
    hideChatVar,
    passedInAvailableNodes,
}: Params = {
        onlyLeafNodeVar: false,
        filterVar: () => true,
    }) => {
    const { getTreeLeafNodes, getNodeById, getBeforeNodesInSameBranchIncludeParent } = useWorkflow()
    const currNode: any = getNodeById(nodeId)
    const availableNodes = onlyLeafNodeVar ? getTreeLeafNodes(nodeId) : getBeforeNodesInSameBranchIncludeParent(nodeId)

    if (currNode) (passedInAvailableNodes ??= []).push(currNode);
    passedInAvailableNodes?.push(...availableNodes)

    const vars = useAvailableVarList(nodeId, {
        onlyLeafNodeVar,
        filterVar,
        hideEnv,
        hideChatVar,
        passedInAvailableNodes,
    })

    
    return vars
}

export default useAvailableEchoVarList