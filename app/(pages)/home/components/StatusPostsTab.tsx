import React, { useEffect, useState } from 'react'
import { IJobPost } from '@/app/shared/utils/types';
import PostCard from '@/app/shared/components/PostCard';
import { getJobListByStatus } from '../utils/getJobListByStatus';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function StatusPostsTab({ status }: { status: string }) {
  const uid = useSelector((state: RootState ) => state.company.company.uid);
  
  const [jobListData, setJobListData] = useState<IJobPost[]>([]);
    const [search, setSearch] = useState<string>('');  
    const [loading, setLoading] = useState(false);
  
    const filteredPost = jobListData.filter((post) => {
      return (post.vendor.Company.toLowerCase().includes(search.toLowerCase()) || post.name.toLowerCase().includes(search.toLowerCase()))
    });
  
    const loadJobList = async () => {
      setLoading(true);
      await getJobListByStatus(setJobListData, status, uid);
      setLoading(false);
    }
  
    useEffect(() => {
      loadJobList();
    }, []);

  return (
    <div>
        <div className="mb-5 flex justify-center">
          <div className="flex 2xl:flex-row xl:flex-row flex-col 2xl:w-[700px] xl:w-[700px] w-full gap-3 h-auto">
            <input 
              value={search}
              className="h-[2.4em] 2xl:px-5 xl:px-5 px-3 2xl:flex-1 xl:flex-1 rounded border border-slate-300"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Post"
            />
            {/* <button 
              onClick={() => router.push('/new-post')}
              className="h-[2.4em] rounded 2xl:w-[120px] xl:w-[120px] w-full bg-primary text-white font-bold"
            >
              + New Post
            </button> */}
          </div>
        </div>
        <div>
          {
          (loading) && 
          (<div>
              <h5 className="text-slate-500 p-5 text-[1.4em]">...loading jobs</h5>
            </div>
          )
          }
          {
          (filteredPost.length === 0 && !loading) && 
          (
            <div>
              <h5 className="text-[1.5em] text-slate-500 px-5">This list is empty</h5>
              {/* <button 
                onClick={() => router.push('/new-post')}
                className="h-[2.4em] rounded 2xl:w-[120px] xl:w-[120px] w-full bg-primary text-white font-bold"
              >
                + New Post
              </button> */}
            </div>
          )
          }
          {(filteredPost.length > 0 && !loading) && (
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-1 gap-3">
            {
              filteredPost.map((jobData) => (
                <PostCard key={jobData.id} jobData={jobData} />
              ))
            }
          </div>)}
        </div>
      </div>
  )
}
