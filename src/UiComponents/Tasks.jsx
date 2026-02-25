import React, { useEffect, useState } from 'react';
import { FaDiscord, FaListUl } from 'react-icons/fa';
import { FaCircleChevronRight, FaXTwitter } from 'react-icons/fa6';
import redeemCoupon from '../assets/redeemCoupon.jpg';
import firstaward from '../assets/first-award.png';
import secondaward from '../assets/second-award.png';
import thirdAward from '../assets/third-award.png';
import avatarImg from '../assets/avatarImg.avif';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
const PROJECT_ID = 'aa02cde2-ba90-4aba-9ba8-ec2d67d1dd9b';
const API_URL = process.env.REACT_APP_API_URL;

const awardImages = {
  1: firstaward,
  2: secondaward,
  3: thirdAward,
};

const ITEMS_PER_PAGE = 10;
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  // new fetch active tasks
  const fetchActiveTasks = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/v1/tasks/active?projectId=${PROJECT_ID}`
      );

      const data = await res.json();

      console.log('FULL TASK API RESPONSE:', data);

      setTasks(data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUserStatus = async () => {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  const res = await fetch(`${API_URL}/api/v1/tasks/user-status`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log("USER STATUS:", data);
};

  const fetchLeaderboard = async (page) => {
    try {
      setLoading(true);

      console.log('Calling Leaderboard API...');

      const res = await fetch(
        `${API_URL}/api/v1/points/leaderboard?projectId=${PROJECT_ID}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      console.log('Response status:', res.status);

      const data = await res.json();

      console.log('FULL LEADERBOARD RESPONSE:', data);

      if (data.status === 'success') {
        console.log('Leaderboard Data:', data.data);
        console.log('Results:', data.results);

        setLeaderboard(data.data || []);
        const total = data.results || 0;
        setTotalPages(total > 0 ? Math.ceil(total / ITEMS_PER_PAGE) : 1);
      } else {
        setLeaderboard([]);
      }
    } catch (err) {
      console.error('Leaderboard fetch error', err);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchTotalPoints = async () => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const res = await fetch(`${API_URL}/api/v1/points/total`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (data.status === "success") {
      setTotalPoints(data.data?.totalPoints || 0);
    }

    console.log("TOTAL POINTS:", data);
  } catch (err) {
    console.error("Total points fetch error:", err);
  }
};
  const completeTask = async (taskId) => {
  try {
    const token = localStorage.getItem('jwt');

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch(`${API_URL}/api/v1/tasks/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      alert('Task completed successfully!');
      fetchActiveTasks();
      fetchLeaderboard(currentPage);
    }
  } catch (err) {
    console.error('Complete task error:', err);
  }
};

  useEffect(() => {
    document.body.classList.remove('no-footer');

    fetchActiveTasks();
    fetchLeaderboard(currentPage);

    return () => {
      document.body.classList.add('no-footer');
    };
  }, [currentPage]);

useEffect(() => {
  fetchUserStatus();
  fetchTotalPoints();   // 👈 ADD THIS
}, []);

  return (
    <div className="page tasks-page">
      <Navbar />
      {/* 🔹 TOP BANNER */}
      <div className="banner">
        <div className="banner-left">
          <h1>ENTRY Loyalty Program</h1>
          <p>Complete tasks to become eligible for ENTRY airdrop</p>
        </div>
      </div>
      {/* 🔹 MAIN CONTENT */}
      <div className="content">
        {/* LEFT - TASKS */}
        <div className="tasks">
          <h3>Earn loyalty points</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ fontWeight: '600', fontSize: '15px' }}>Start Here</p>

            <p style={{ fontSize: '14px', color: '#d8d0d0ff' }}>
              Complete tasks to claim your OG Badge
            </p>
          </div>
          <div
            className="tasks-scroll"
            style={{
              maxHeight: '520px',
              overflowY: 'auto',
              paddingRight: '6px',
              marginTop: '12px',
            }}
          >
            {tasks.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.6 }}>
                No active tasks available
              </p>
            ) : (
              tasks.map((task) => (
                <div className="task-card" key={task.id}>
                  <div className="task-left">
                    <span className="points">{task.points} E</span>

                    <div>
                      <strong className="flex items-center gap-1 font-semibold">
                        {task.socialMediaName === 'X' && (
                          <FaXTwitter size={18} />
                        )}
                        {task.socialMediaName === 'DISCORD' && (
                          <FaDiscord size={18} />
                        )}
                        {task.socialMediaName}
                      </strong>

                      <p className="text-sm text-gray-500">{task.message}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="task-Button"
                    onClick={() => {
                      if (task.taskUrl) window.open(task.taskUrl, '_blank');
                      completeTask(task.id);
                    }}
                  >
                    Complete
                  </button>
                </div>
              ))
            )}
          </div>

          <div>
            {/* part2 */}
            <h5 style={{ fontWeight: '600', fontSize: '15px' }}>
              Collaboration Badges
            </h5>
            <div
              className="tasks-scroll"
              style={{
                maxHeight: '320px',
                overflowY: 'auto',
                paddingRight: '6px',
                marginTop: '12px',
              }}
            >
              <div className="task-card">
                <div className="task-left flex items-center gap-3">
                  <div
                    style={{
                      backgroundColor: ' rgba(255,255,255,0.1)',
                      padding: ' 7px 20px',
                    }}
                  >
                    <img
                      style={{ width: '40px' }}
                      src={redeemCoupon}
                      alt="Redeem"
                      className="w-2 h-2 object-contain"
                    />
                  </div>
                  <div>
                    <strong className="leading-none">Redeem Code</strong>
                    {/* <p className="text-sm text-gray-500">Redeem Code</p> */}
                  </div>
                </div>
                <button type="button" className="task-Button">
                  Enter Code
                </button>
              </div>
              <div className="task-card">
                <div className="task-left flex items-center gap-3">
                  <div
                    style={{
                      backgroundColor: ' rgba(255,255,255,0.1)',
                      padding: ' 7px 20px',
                    }}
                  >
                    <img
                      style={{ width: '40px' }}
                      src={redeemCoupon}
                      alt="Redeem"
                      className="w-2 h-2 object-contain"
                    />
                  </div>

                  <div>
                    <strong className="leading-none">Lorem ipsum</strong>
                    {/* <p className="text-sm text-gray-500">Redeem Code</p> */}
                  </div>
                </div>
                <button type="button" className="task-Button">
                  Enter Code
                </button>
              </div>
              <div className="task-card">
                <div className="task-left flex items-center gap-3">
                  <div
                    style={{
                      backgroundColor: ' rgba(255,255,255,0.1)',
                      padding: ' 7px 20px',
                    }}
                  >
                    <img
                      style={{ width: '40px' }}
                      src={redeemCoupon}
                      alt="Redeem"
                      className="w-2 h-2 object-contain"
                    />
                  </div>
                  <div>
                    
                    <strong className="leading-none">Lorem ipsum dolor</strong>
                    {/* <p className="text-sm text-gray-500">Redeem Code</p> */}
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Enter Code
                </button>
              </div>
            </div>
            <h5 style={{ fontWeight: '600', fontSize: '15px' }}>
              Daily Quests
            </h5>
            <div
              className="tasks-scroll"
              style={{
                maxHeight: '320px',
                overflowY: 'auto',
                paddingRight: '6px',
                marginTop: '12px',
              }}
            >
              <div className="task-card">
                <div className="task-left">
                  <span className="points">
                    {/* <FaGift style={{ padding: '4px 16px', font: '18px' }} /> */}
                    23/A
                  </span>
                  <div>
                    {' '}
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'white',
                        fontWeight: '700',
                      }}
                    >
                      points update in 6 hours
                    </p>
                    <strong>Refer friends</strong>
                    <p>
                      Your friends will earn 100 XP. You will earn 10% of the XP
                      they earn
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Get My Refarral Link
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Post about Entry</strong>
                    <p>
                      Your post should use one of the keywords: Entry,
                      @entry_network, entry_network, <br /> entry network
                      Quality posts will be awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Lorem ipsum.</strong>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Enim, odio. <br /> entry network Quality posts will be
                      awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Lorem ipsum dolor sit amet.</strong>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aut illum velit enim! <br /> entry network Quality posts
                      will be awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Lorem ipsum dolor.</strong>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Enim, odio. <br /> entry network Quality posts will be
                      awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Lorem ipsum dolor sit</strong>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Enim, odio. <br /> entry network Quality posts will be
                      awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
              <div className="task-card">
                <div className="task-left">
                  <span className="points">25 /E</span>
                  <div>
                    <strong>Lorem ipsum dolor.</strong>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Enim, odio. <br /> entry network Quality posts will be
                      awarded with extra XP
                    </p>
                  </div>
                </div>
                <button type="submit" className="task-Button">
                  Submit Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT - LEADERBOARD */}
        <div className="leaderboard">
          <h3>Leaderboard</h3>
          {/* Scrollable Leaderboard */}
          <div className="leaderboard-scroll">
            <p style={{ fontWeight: "600" }}>
  Your Total Points: {totalPoints} 
</p>
            {loading && (
              <p style={{ textAlign: 'center', opacity: 0.6 }}>
                Loading leaderboard...
              </p>
            )}

            {leaderboard.map((user, index) => {
              const rank = user.rank || index + 1;

              return (
                <div className="leader-row" key={user.walletAddress || index}>
                  <span className="rank">
                    {rank <= 3 ? (
                      <img
                        src={awardImages[rank]}
                        alt={`Rank ${rank} award`}
                        className="awardImg"
                      />
                    ) : (
                      rank
                    )}
                  </span>

                  <span className="name name-with-avatar">
                    <img src={avatarImg} alt="User avatar" className="avatar" />
                    {user.walletAddress
                      ? `${user.walletAddress.slice(0, 6)}...`
                      : 'Unknown'}
                  </span>

                  <span className="score">{user.totalPoints} E</span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              marginTop: '16px',
            }}
          >
            <button
              type="button"
              style={{ color: 'black' }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              style={{ color: 'black' }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
          {/* View All */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15px',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ textAlign: 'center', fontSize: '16px' }}>
              View All{' '}
              <FaCircleChevronRight
                className="ml-auto text-gray-500"
                size={16}
                style={{ marginLeft: '8px' }}
              />
            </h3>
          </div>
          {/* History Section */}
          <div>
            <h3>History</h3>
            <div
              style={{
                backgroundColor: '#0e2a4d',
                padding: '60px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <FaListUl className="h-16 w-16 mb-6 text-tx-secondary mx-auto" />
              <h3>Connect your wallet to view history</h3>
              <p>See all your earned points and rewards history.</p>

              <a href="/login">
                <strong style={{ color: 'white' }}>Sign in</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Tasks;
