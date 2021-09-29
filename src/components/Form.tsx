import { ASTNode } from "graphql";
import { Box, FormControl, Select, FormLabel } from "@chakra-ui/react"
import { useForm } from '../hooks/useForm';
import { H2 } from '../components/text';
import { useTransformerContext } from '../context/context';
import { getDateList } from '../utils/getDateList';

export const Form = ({ result, node }: { result?: any, node: ASTNode }) => {
  const pathList = result.data.analytics.path_list;
    
  if (node.kind === 'Document') {
    return (
      <Box>
        {node.definitions.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Box>
    );
  }
  
  if (node.kind === 'OperationDefinition') {
    return (
      <Box border="1px solid white" boxSizing="border-box">
        <Form node={node.selectionSet} result={result} />
      </Box>
    );
  }
  
  if (node.kind === 'SelectionSet') {
    return (
      <Box>
        {node.selections.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Box>
    )
  }
  
  if (node.kind === 'Field') {
    const api = useTransformerContext();
    const {
      handleChange, 
      state
    } = useForm();
  
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      handleChange(e);
      onUpdateAST(e);
    };
  
    const onUpdateAST = (event: React.ChangeEvent<HTMLSelectElement>) => {
      api.updateNode(event.target.name, event.target.value);
    };
    
    return (
      <Box width={'40vw'} padding={'10px'}>
        <H2 text={'data'}></H2>
        <FormControl>
          <FormLabel>domain</FormLabel>
          <Select name={'domain'} onChange={onChange}>
            <option value={'undefined'}>all</option>
            <option value={1}>takurinton.com</option>
            <option value={2}>blog.takurinton.com</option>
          </Select>
    
          <FormLabel>path</FormLabel>
          <Select name={'path'} onChange={onChange} placeholder={'pathを入力してください'}>
            {
              state.domain === '1' ? <option value={'/'} >{'/'}</option> : 
              pathList.map((path: { path: string }) => {
                return <option key={path.path} value={path.path} >{path.path}</option>
              })
            }
          </Select>
    
          <FormLabel>start</FormLabel>
          <Select name={'start'} onChange={onChange}>
            <option value={''}>all</option>
            {
              getDateList().map(d => <option value={d}>{d}</option>)
            }
          </Select>
    
          <FormLabel>end</FormLabel>
          <Select name={'end'} onChange={onChange}>
            <option value={''}>all</option>
            {
              getDateList().map(d => <option value={d}>{d}</option>)
            }
          </Select>
        </FormControl>
      </Box>
    );
  };
  
  return <Box>error</Box>
}