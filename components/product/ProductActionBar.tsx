"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Printer,
  Mail,
  Share2,
  Video,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionBarProps {
  productName: string;
  productUrl: string;
  virtualTourUrl?: string;
  onDesignYourOwn?: () => void;
}

export default function ProductActionBar({
  productName,
  productUrl,
  onDesignYourOwn,
}: ProductActionBarProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
    setShowMoreMenu(false);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Check out this trailer: ${productName}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this trailer:\n\n${productName}\n${productUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShowMoreMenu(false);
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedTitle = encodeURIComponent(productName);

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">

      {/* Desktop: Individual buttons */}
      <div className="flex items-center flex-wrap gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={onDesignYourOwn}
        className="text-blue-600 border-blue-600 hover:bg-blue-50 text-xs sm:text-sm"
      >
        <Pencil className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Design Your Own</span>
      </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrint}
          className="text-gray-600 hover:text-gray-900"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleEmail}
          className="text-gray-600 hover:text-gray-900"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>

        {/* Share dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
              >
                <ShareMenuItems
                  onShare={handleShare}
                  onCopyLink={handleCopyLink}
                  copied={copied}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Reusable share menu items
function ShareMenuItems({
  onShare,
  onCopyLink,
  copied,
}: {
  onShare: (platform: string) => void;
  onCopyLink: () => void;
  copied: boolean;
}) {
  return (
    <>
      <button
        onClick={() => onShare("facebook")}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <Facebook className="h-4 w-4 text-blue-600" />
        Facebook
      </button>
      <button
        onClick={() => onShare("twitter")}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <Twitter className="h-4 w-4 text-sky-500" />
        Twitter
      </button>
      <button
        onClick={() => onShare("linkedin")}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <Linkedin className="h-4 w-4 text-blue-700" />
        LinkedIn
      </button>
      <div className="border-t border-gray-100 my-1" />
      <button
        onClick={onCopyLink}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4 text-gray-500" />
            Copy Link
          </>
        )}
      </button>
    </>
  );
}
