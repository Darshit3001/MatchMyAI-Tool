export type PricingModel = "FREE" | "FREEMIUM" | "PAID" | "CONTACT";

export interface Tool {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription?: string;
    logo?: string;
    screenshot?: string;
    website: string;
    apiDocs?: string;
    version?: string;
    country?: string;
    isVerified: boolean;
    isFeatured: boolean;
    isSponsored: boolean;
    pricingModel: PricingModel;
    priceFrom?: number;
    priceCurrency?: string;
    viewCount: number;
    saveCount: number;
    avgRating: number;
    reviewCount: number;
    category: Category;
    categoryId: string;
    tags: Tag[];
    company?: Company;
    releases?: Release[];
    releasedAt: string;
    createdAt: string;
    updatedAt: string;
    // Computed
    trendingRank?: number;
    commentPreview?: CommentPreview;
}

export interface Category {
    id: string;
    slug: string;
    name: string;
    icon?: string;
    description?: string;
    toolCount: number;
    parentId?: string;
}

export interface Tag {
    id: string;
    slug: string;
    name: string;
}

export interface Company {
    id: string;
    slug: string;
    name: string;
    logo?: string;
    website?: string;
    country?: string;
}

export interface Release {
    id: string;
    version: string;
    changelog?: string;
    releasedAt: string;
}

export interface Review {
    id: string;
    rating: number;
    title?: string;
    content: string;
    pros: string[];
    cons: string[];
    upvotes: number;
    downvotes: number;
    user: UserProfile;
    createdAt: string;
}

export interface Comment {
    id: string;
    content: string;
    upvotes: number;
    downvotes: number;
    user: UserProfile;
    replies?: Comment[];
    createdAt: string;
}

export interface CommentPreview {
    content: string;
    userName: string;
    userAvatar?: string;
    upvotes: number;
}

export interface Collection {
    id: string;
    slug: string;
    name: string;
    description?: string;
    isPublic: boolean;
    user: UserProfile;
    tools: Tool[];
    toolCount: number;
    createdAt: string;
}

export interface UserProfile {
    id: string;
    name: string;
    avatar?: string;
    karma: number;
    toolCount?: number;
}

export interface APIResponse<T> {
    data: T;
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
