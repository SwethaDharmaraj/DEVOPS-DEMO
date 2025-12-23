import React, { useState } from 'react';
import { Calendar, User, Eye, Heart, MessageCircle, Share, Clock, Tag, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
  likes: number;
}

export const TravelBlog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'destinations', name: 'Destinations', count: 8 },
    { id: 'tips', name: 'Travel Tips', count: 6 },
    { id: 'culture', name: 'Culture', count: 4 },
    { id: 'food', name: 'Food & Dining', count: 3 },
    { id: 'adventure', name: 'Adventure', count: 3 }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Hidden Gems of Paris: Beyond the Tourist Trail',
      excerpt: 'Discover the secret spots locals love in the City of Light. From hidden gardens to underground bars, explore Paris like never before.',
      content: 'Paris, the eternal City of Light, harbors countless secrets beyond its famous landmarks. While millions flock to the Eiffel Tower and Louvre, a parallel Paris exists in quiet corners and hidden passages...',
      author: 'Sophie Laurent',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-03-10',
      readTime: 8,
      category: 'destinations',
      tags: ['Paris', 'Hidden Gems', 'Local Culture', 'Photography'],
      image: '/placeholder.svg',
      likes: 245,
      comments: 18,
      views: 1240,
      featured: true
    },
    {
      id: '2',
      title: 'The Ultimate Packing Guide for Digital Nomads',
      excerpt: 'Learn how to pack smart and travel light while staying productive on the road. Essential gear and tips for the modern nomad.',
      content: 'Living as a digital nomad requires a completely different approach to packing. Every item must serve multiple purposes, be lightweight, and durable enough to withstand constant travel...',
      author: 'Marcus Chen',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-03-08',
      readTime: 12,
      category: 'tips',
      tags: ['Digital Nomad', 'Packing', 'Productivity', 'Remote Work'],
      image: '/placeholder.svg',
      likes: 189,
      comments: 25,
      views: 890,
      featured: false
    },
    {
      id: '3',
      title: 'Street Food Adventures in Bangkok: A Culinary Journey',
      excerpt: 'Navigate the vibrant street food scene of Bangkok with our comprehensive guide to the best local dishes and hidden food markets.',
      content: 'Bangkok\'s street food scene is legendary, offering an incredible array of flavors, aromas, and textures that define Thai cuisine. From bustling night markets to quiet street-side stalls...',
      author: 'Priya Sharma',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-03-05',
      readTime: 10,
      category: 'food',
      tags: ['Bangkok', 'Street Food', 'Thai Cuisine', 'Local Culture'],
      image: '/placeholder.svg',
      likes: 312,
      comments: 42,
      views: 1580,
      featured: true
    },
    {
      id: '4',
      title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
      excerpt: 'Practical tips for environmentally conscious travelers who want to explore the world while minimizing their impact on the planet.',
      content: 'In an age of climate awareness, travelers are increasingly seeking ways to explore the world responsibly. Sustainable travel isn\'t just a trend—it\'s a necessary evolution...',
      author: 'Emma Rodriguez',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-03-03',
      readTime: 6,
      category: 'tips',
      tags: ['Sustainable Travel', 'Environment', 'Eco-Friendly', 'Climate'],
      image: '/placeholder.svg',
      likes: 156,
      comments: 14,
      views: 720,
      featured: false
    },
    {
      id: '5',
      title: 'Island Hopping in the Greek Cyclades: A Complete Guide',
      excerpt: 'Plan the perfect Greek island adventure with insider tips on the best islands, ferry routes, and hidden beaches in the Cyclades.',
      content: 'The Greek Cyclades represent the quintessential Mediterranean experience: whitewashed villages perched on dramatic cliffs, azure waters stretching to infinity...',
      author: 'Dimitris Kostas',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-03-01',
      readTime: 15,
      category: 'destinations',
      tags: ['Greece', 'Islands', 'Mediterranean', 'Beaches'],
      image: '/placeholder.svg',
      likes: 278,
      comments: 31,
      views: 1320,
      featured: true
    },
    {
      id: '6',
      title: 'Solo Female Travel: Safety Tips and Empowerment',
      excerpt: 'Essential advice for women traveling alone, from safety precautions to building confidence and connecting with fellow travelers.',
      content: 'Solo female travel has grown exponentially in recent years, with more women than ever choosing to explore the world independently. While the rewards are immense...',
      author: 'Sarah Johnson',
      authorAvatar: '/placeholder.svg',
      publishDate: '2024-02-28',
      readTime: 9,
      category: 'tips',
      tags: ['Solo Travel', 'Female Travel', 'Safety', 'Empowerment'],
      image: '/placeholder.svg',
      likes: 201,
      comments: 38,
      views: 950,
      featured: false
    }
  ];

  const comments: Comment[] = [
    {
      id: '1',
      postId: '1',
      author: 'Marie Dubois',
      authorAvatar: '/placeholder.svg',
      content: 'Amazing article! I discovered two new cafés in Paris thanks to your recommendations.',
      date: '2024-03-11',
      likes: 12
    },
    {
      id: '2',
      postId: '1',
      author: 'James Wilson',
      authorAvatar: '/placeholder.svg',
      content: 'The hidden garden in Montmartre was absolutely magical. Thank you for sharing!',
      date: '2024-03-12',
      likes: 8
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return b.views - a.views;
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {post.featured && (
        <div className="bg-blue-600 text-white px-3 py-1 text-xs font-medium absolute z-10 top-4 left-4 rounded">
          Featured
        </div>
      )}
      
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          <Clock className="w-3 h-3 inline mr-1" />
          {post.readTime} min read
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {categories.find(cat => cat.id === post.category)?.name}
          </span>
          <div className="flex items-center text-xs text-gray-500 gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.comments}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 text-xs text-gray-600">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-gray-800">{post.author}</div>
              <div className="text-xs text-gray-500">{formatDate(post.publishDate)}</div>
            </div>
          </div>

          <Button
            onClick={() => setSelectedPost(post.id)}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            Read More
          </Button>
        </div>
      </div>
    </article>
  );

  const FullPostView: React.FC<{ post: BlogPost }> = ({ post }) => {
    const postComments = comments.filter(comment => comment.postId === post.id);
    
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <Button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80"
          >
            ← Back to Posts
          </Button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {categories.find(cat => cat.id === post.category)?.name}
              </span>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} views
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800">{post.author}</div>
                  <div className="text-sm text-gray-600">Travel Blogger</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <Share className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
            
            {/* Mock additional content */}
            <div className="mt-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium text-gray-700">Tags:</span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Comments ({postComments.length})
              </h3>

              {postComments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 py-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-800">{comment.author}</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                        <Heart className="w-4 h-4" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Comment Form */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Leave a Comment</h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your thoughts..."
                ></textarea>
                <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    return post ? <FullPostView post={post} /> : null;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Travel Blog</h1>
        <p className="text-gray-600">
          Discover amazing destinations, travel tips, and inspiring stories from fellow travelers around the world.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search posts, tags, or authors..."
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedPosts.filter(post => post.featured).slice(0, 2).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'Latest Posts' : 
             categories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <span className="text-gray-600">
            {sortedPosts.length} posts found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.filter(post => selectedCategory !== 'all' || !post.featured).map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};